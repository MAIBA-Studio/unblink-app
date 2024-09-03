"use client";

import { alpha, Button, ButtonProps, styled, useTheme } from "@mui/material";
import { ReactNode } from "react";

type OutlineButtonColor = "green" | "cyan" | "neutral" | "purple";

const OutlineButtonBase = styled(Button)<
  ButtonProps & { preset: OutlineButtonColor }
>(({ theme, preset }) => {
  switch (preset) {
    case "green":
      return {
        color: theme.palette.green[60],
        backgroundColor: `transparent`,
        border: `2px solid ${theme.palette.green[60]}`,
        "&:hover:not(:disabled)": {
          border: `2px solid ${theme.palette.green[40]}`,
          backgroundColor: alpha(theme.palette.neutral[20], 0.05),
        },
        "&:active:not(:disabled)": {
          border: `2px solid ${theme.palette.green[80]}`,
          backgroundColor: alpha(theme.palette.neutral[40], 0.05),
        },
        "&:disabled": {
          opacity: 0.5,
          color: theme.palette.green[60],
          backgroundColor: `transparent`,
          border: `2px solid ${theme.palette.green[60]}`,
        },
      };

    case "cyan":
      return {
        color: theme.palette.cyan[60],
        backgroundColor: `transparent`,
        border: `2px solid ${theme.palette.cyan[60]}`,
        "&:hover:not(:disabled)": {
          border: `2px solid ${theme.palette.cyan[40]}`,
          backgroundColor: alpha(theme.palette.neutral[20], 0.05),
        },
        "&:active:not(:disabled)": {
          border: `2px solid ${theme.palette.cyan[80]}`,
          backgroundColor: alpha(theme.palette.neutral[40], 0.05),
        },
        "&:disabled": {
          opacity: 0.5,
          color: theme.palette.cyan[60],
          backgroundColor: `transparent`,
          border: `2px solid ${theme.palette.cyan[60]}`,
        },
      };

    case "neutral":
      return {
        color: theme.palette.neutral[0],
        backgroundColor: `transparent`,
        border: `2px solid ${theme.palette.neutral[0]}`,
        "&:hover:not(:disabled)": {
          border: `2px solid ${theme.palette.neutral[20]}`,
          backgroundColor: alpha(theme.palette.neutral[20], 0.05),
        },
        "&:active:not(:disabled)": {
          border: `2px solid ${theme.palette.neutral[40]}`,
          backgroundColor: alpha(theme.palette.neutral[40], 0.05),
        },
        "&:disabled": {
          opacity: 0.5,
          color: theme.palette.neutral[0],
          backgroundColor: `transparent`,
          border: `2px solid ${theme.palette.neutral[0]}`,
        },
      };

    case "purple":
    default:
      return {
        color: theme.palette.purple[60],
        backgroundColor: `transparent`,
        border: `2px solid ${theme.palette.purple[60]}`,
        "&:hover:not(:disabled)": {
          border: `2px solid ${theme.palette.purple[40]}`,
          backgroundColor: alpha(theme.palette.neutral[20], 0.05),
        },
        "&:active:not(:disabled)": {
          border: `2px solid ${theme.palette.purple[80]}`,
          backgroundColor: alpha(theme.palette.neutral[40], 0.05),
        },
        "&:disabled": {
          opacity: 0.5,
          color: theme.palette.purple[60],
          backgroundColor: `transparent`,
          border: `2px solid ${theme.palette.purple[60]}`,
        },
      };
  }
});

interface IOutlineButton extends ButtonProps {
  children: ReactNode;
  preset?: OutlineButtonColor;
}

export const OutlineButton = ({
  children,
  preset = "green",
  ...rest
}: IOutlineButton) => {
  const theme = useTheme();

  return (
    <OutlineButtonBase
      variant="outlined"
      preset={preset}
      sx={{
        borderRadius: theme.spacing(4),
        padding: theme.spacing(1, 2.5),
        textWrap: "nowrap",
        width: "fit-content",
        boxSizing: "border-box",
        flexShrink: 0,
        flexWrap: "nowrap",
      }}
      {...rest}
    >
      {children}
    </OutlineButtonBase>
  );
};
