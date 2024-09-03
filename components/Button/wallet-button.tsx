"use client";

// next
import { signOut } from "next-auth/react";
import Image from "next/image";

// components
import { useUnifiedWalletContext, useWallet } from "@jup-ag/wallet-adapter";
import {
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
  color: connected ? theme.palette.neutral[20] : theme.palette.green[60],
  backgroundColor: `${
    connected ? theme.palette.green[60] : theme.palette.green[0]
  } !important`,
  "&:hover:not(:disabled)": {
    backgroundColor: `${
      connected ? theme.palette.neutral[0] : theme.palette.green[80]
    } !important`,
    color: `${
      connected ? theme.palette.green[80] : theme.palette.green[60]
    } !important`,
  },
  "&:active:not(:disabled)": {
    backgroundColor: `${
      connected ? theme.palette.neutral[40] : theme.palette.green[20]
    } !important`,
    color: `${
      connected ? theme.palette.green[20] : theme.palette.green[60]
    } !important`,
  },
  "&:disabled": {
    opacity: 0.5,
    color: theme.palette.green[60],
    backgroundColor: theme.palette.green[0],
  },
  borderRadius: "12px",
  padding: theme.spacing(1.25, 2.5),
  display: "inline-flex",
  gap: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
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
          <Typography sx={theme.typography.base.sm}>Connecting...</Typography>
        ) : (
          <Typography sx={theme.typography.base.sm}>Connect Wallet</Typography>
        )
      ) : (
        connected &&
        userWallet && (
          <>
            <Image
              src={wallet!.adapter.icon}
              alt={wallet!.adapter.name}
              width={20}
              height={20}
            />
            <Typography sx={theme.typography.base.sm}>
              {shortenAddress(userWallet?.toBase58())}
            </Typography>
          </>
        )
      )}
    </StyledButton>
  );
};
