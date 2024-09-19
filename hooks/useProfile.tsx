"use client";

import { SignInMessage } from "@/auth/sign-in-message";
import { MEMO_PROGRAM_ID } from "@/lib/constants/addresses";
import { useToast } from "@/providers/toast-provider";
import {
  fetchProfileService,
  registerProfileService,
} from "@/services/api/profile.service";
import { useGlobalStore } from "@/store";
import { useConnection, useWallet } from "@jup-ag/wallet-adapter";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import base58 from "bs58";
import { signIn as _signIn, getCsrfToken } from "next-auth/react";

const useProfile = () => {
  const { showToast } = useToast();
  const wallet = useWallet();
  const queryClient = useQueryClient();
  const { connection } = useConnection();
  const walletAddress = wallet?.publicKey?.toBase58() || "";
  const { isSignedIn, setIsSignedIn } = useGlobalStore();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
    isRefetching: isRefetchingProfile,
  } = useQuery({
    queryKey: [`fetch-profile`],
    queryFn: () => fetchProfileService(walletAddress),
    enabled: !!walletAddress && isSignedIn,
    refetchInterval: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: registerProfileService,
    mutationKey: [`register-profile`],
  });

  const registerProfile = async () => {
    // Register the user in supabase
    const res = await mutateAsync({ walletAddress });

    if (res && !(`error` in res)) {
      await queryClient.invalidateQueries({
        queryKey: [`fetch-profile`],
      });
      await refetchProfile();
    } else {
      showToast(
        "error",
        false,
        "Error Signing In",
        (res?.error as string) ?? "Something went wrong. Please try again."
      );

      return;
    }

    showToast(
      "info",
      false,
      "Successfully registered",
      "Welcome to Breakpoint Bingo!",
      true
    );

    return res;
  };

  const signIn = async (isLedger: boolean = false) => {
    try {
      const csrfToken = await getCsrfToken();

      showToast(
        "info",
        false,
        "Verifying Wallet",
        "Please do not refresh this page or close this browser tab",
        true
      );

      if (!wallet || !wallet.publicKey || !wallet.signMessage || !csrfToken) {
        console.error("Error", "Unexpected wallet error");
        showToast(
          "error",
          false,
          "Wallet Verification Failed",
          "Please try to verify your wallet ownership again"
        );
        return;
      }

      const message = new SignInMessage({
        domain: window.location.host,
        publicKey: walletAddress,
        nonce: csrfToken,
        issueDate: new Date().toISOString(),
      });

      const data = new TextEncoder().encode(message.prepare());

      let signature: null | Uint8Array = null;

      if (isLedger) {
        // If user is on a ledger, create a TX with a memo instruction
        // and verify is signature matches the feePayer and the wallet publicKey
        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash("confirmed");
        const authTx = new Transaction({
          feePayer: wallet.publicKey,
          blockhash: blockhash,
          lastValidBlockHeight: lastValidBlockHeight,
        }).add(
          new TransactionInstruction({
            programId: new PublicKey(MEMO_PROGRAM_ID),
            keys: [
              { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
            ],
            data: Buffer.from(data),
          })
        );
        if (!wallet.signTransaction)
          throw Error("signTransaction not supported!");
        const signedAuthTx = await wallet.signTransaction(authTx);

        // Validate memo instruction data first, then validate the
        // signed transaction if the wallet signatures and payers match up
        const memoIx =
          signedAuthTx.instructions[signedAuthTx.instructions.length - 1];
        if (
          memoIx.programId.equals(new PublicKey(MEMO_PROGRAM_ID)) &&
          memoIx.data.toString() === Buffer.from(data).toString() &&
          signedAuthTx.verifySignatures() &&
          signedAuthTx.signatures[0]
        ) {
          signature = new Uint8Array(signedAuthTx.signatures[0].signature!);
        }
      } else {
        // Else, just do it normally via signMe
        signature = await wallet.signMessage(data);
      }

      if (!signature) {
        console.error(
          "Wallet error",
          "Transaction rejected was rejected by user."
        );
        showToast(
          "error",
          false,
          "Wallet Verification Failed",
          "Please try to verify your wallet ownership again"
        );
        return;
      }

      // Sign in with next-auth using the wallet
      await _signIn("credentials", {
        message: JSON.stringify(message),
        signature: base58.encode(signature),
        csrfToken,
        redirect: false,
        isLedger,
      });

      // Register the user in supabase
      const body = {
        walletAddress,
      };

      const res = await mutateAsync(body);
      console.log("res", res);

      if (res && !(`error` in res)) {
        await queryClient.invalidateQueries({
          queryKey: [`fetch-profile`],
        });
        await refetchProfile();
      } else {
        showToast(
          "error",
          false,
          "Error Signing In",
          (res?.error as string) ?? "Something went wrong. Please try again."
        );

        return;
      }

      // If everything is successful, set the user address in local storage
      localStorage.setItem("userAddress", walletAddress);

      showToast(
        "success",
        false,
        "Wallet Verified",
        "Your wallet ownership has been successfully verified"
      );

      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        false,
        "Wallet Verification Failed",
        "Please try to verify your wallet ownership again"
      );
    }
  };

  return {
    signIn,
    registerProfile,
    refetchProfile,
    isSignedIn,
    profile,
    isLoadingProfile,
    isRefetchingProfile,
  };
};

export default useProfile;
