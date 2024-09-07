"use client";

import { VerifiedUser as VerifiedUserIcon } from "@mui/icons-material";
import { Drawer, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface ISignInDrawer {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInDrawer = ({ isOpen, onClose }: ISignInDrawer) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Drawer anchor={"bottom"} open={isOpen} onClose={onClose}>
      <Stack rowGap={2}>
        <Stack flexDirection={"row"}>
          <VerifiedUserIcon fontSize="large" />
          <Typography
            sx={{
              ...theme.typography.base.xl,
              color: theme.palette.breakpoint?.neutral[0],
            }}
          >
            Verify Wallet Ownership
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
};
