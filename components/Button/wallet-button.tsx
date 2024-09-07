"use client";

// next
import { signOut } from "next-auth/react";
import Image from "next/image";

// components
import { useUnifiedWalletContext, useWallet } from "@jup-ag/wallet-adapter";
import {
  alpha,
  Button,
  ButtonProps,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

// lib
import { shortenAddress } from "@/lib/formatters";
import { shouldNotForwardPropsWithKeys } from "@/lib/utils";

const StyledButton = styled(Button, {
  shouldForwardProp: shouldNotForwardPropsWithKeys(["connected"]),
})<{ connected?: boolean }>(({ theme, connected }) => ({
  color: connected ? theme.palette.neutral[80] : theme.palette.warning.main,
  backgroundColor: `${
    connected ? theme.palette.warning.main : "transparent"
  } !important`,
  "&:hover:not(:disabled)": {
    backgroundColor: connected
      ? theme.palette.warning.light
      : `${alpha(theme.palette.warning.light, 0.1)} !important`,
    color: `${
      connected ? theme.palette.neutral[80] : theme.palette.warning.main
    } !important`,
  },
  "&:active:not(:disabled)": {
    backgroundColor: connected
      ? theme.palette.warning.dark
      : `${alpha(theme.palette.warning.dark, 0.1)} !important`,
    color: `${
      connected ? theme.palette.neutral[80] : theme.palette.warning.main
    } !important`,
  },
  "&:disabled": {
    opacity: 0.5,
    color: connected ? theme.palette.neutral[80] : theme.palette.warning.main,
    backgroundColor: `${
      connected ? theme.palette.warning.main : "transparent"
    } !important`,
  },
  borderRadius: theme.spacing(4),
  border: `1px solid ${theme.palette.warning.main}`,
  padding: theme.spacing(1, 2.5),
  display: "inline-flex",
  gap: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
  textWrap: "nowrap",
  width: "fit-content",
  boxSizing: "border-box",
  flexShrink: 0,
}));

interface IWalletButton extends ButtonProps {
  overrideDisconnect?: boolean;
}

export const WalletButton = ({
  overrideDisconnect,
  ...rest
}: IWalletButton) => {
  const {
    connected,
    disconnect,
    connecting,
    publicKey: userWallet,
    wallet,
  } = useWallet();
  const theme = useTheme();
  const { setShowModal } = useUnifiedWalletContext();

  const handleButtonClick = () => {
    if (connected) {
      if (overrideDisconnect) return;
      signOut({ redirect: false });
      disconnect();
    } else {
      setShowModal(true);
    }
  };

  return (
    <StyledButton
      variant="contained"
      {...rest}
      onClick={handleButtonClick}
      connected={connected}
    >
      {!connected ? (
        connecting ? (
          <Typography sx={theme.typography.base.md}>Connecting...</Typography>
        ) : (
          <Typography sx={theme.typography.base.md}>Connect Wallet</Typography>
        )
      ) : (
        connected &&
        userWallet && (
          <>
            <Image
              src={wallet?.adapter.icon || ""}
              alt={wallet?.adapter.name || ""}
              width={20}
              height={20}
            />
            <Typography sx={theme.typography.base.md}>
              {shortenAddress(userWallet?.toBase58())}
            </Typography>
          </>
        )
      )}
    </StyledButton>
  );
};
