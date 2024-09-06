"use client";

import { Button, ButtonProps, styled, useTheme } from "@mui/material";
import { ReactNode } from "react";

type SolidButtonColor = "green" | "cyan" | "neutral" | "purple" | "orange";

const ColorButton = styled(Button)<ButtonProps & { preset: SolidButtonColor }>(
  ({ theme, preset }) => {
    switch (preset) {
      case "green":
        return {
          color: theme.palette.neutral[80],
          backgroundColor: `${theme.palette.green?.[60]}`,
          "&:hover:not(:disabled)": {
            backgroundColor: theme.palette.green?.[40],
          },
          "&:active:not(:disabled)": {
            backgroundColor: theme.palette.green?.[80],
          },
          "&:disabled": {
            opacity: 0.5,
            color: theme.palette.neutral[80],
            backgroundColor: theme.palette.green?.[60],
          },
        };

      case "cyan":
        return {
          color: theme.palette.neutral[80],
          backgroundColor: `${theme.palette.cyan?.[60]}`,
          "&:hover:not(:disabled)": {
            backgroundColor: theme.palette.cyan?.[40],
          },
          "&:active:not(:disabled)": {
            backgroundColor: theme.palette.cyan?.[80],
          },
          "&:disabled": {
            opacity: 0.5,
            color: theme.palette.neutral[80],
            backgroundColor: theme.palette.cyan?.[60],
          },
        };

      case "neutral":
        return {
          color: theme.palette.neutral[80],
          backgroundColor: `${theme.palette.neutral[0]}`,
          "&:hover:not(:disabled)": {
            backgroundColor: theme.palette.neutral[20],
          },
          "&:active:not(:disabled)": {
            backgroundColor: theme.palette.neutral[40],
          },
          "&:disabled": {
            opacity: 0.5,
            color: theme.palette.neutral[80],
            backgroundColor: theme.palette.neutral[0],
          },
        };

      case "orange":
        return {
          color: theme.palette.neutral[80],
          backgroundColor: `${theme.palette.warning.main}`,
          "&:hover:not(:disabled)": {
            backgroundColor: theme.palette.warning.main,
          },
          "&:active:not(:disabled)": {
            backgroundColor: theme.palette.warning.main,
          },
          "&:disabled": {
            opacity: 0.5,
            color: theme.palette.neutral[80],
            backgroundColor: theme.palette.warning.main,
          },
        };

      case "purple":
      default:
        return {
          color: theme.palette.purple?.[0],
          backgroundColor: `${theme.palette.purple?.[60]}`,
          "&:hover:not(:disabled)": {
            color: theme.palette.neutral[80],
            backgroundColor: theme.palette.purple?.[40],
          },
          "&:active:not(:disabled)": {
            color: theme.palette.purple?.[0],
            backgroundColor: theme.palette.purple?.[80],
          },
          "&:disabled": {
            opacity: 0.5,
            color: theme.palette.purple?.[0],
            backgroundColor: theme.palette.purple?.[60],
          },
        };
    }
  }
);

interface ISolidButton extends ButtonProps {
  children: ReactNode;
  preset?: SolidButtonColor;
}

export const SolidButton = ({
  children,
  preset = "purple",
  ...rest
}: ISolidButton) => {
  const theme = useTheme();
  return (
    <ColorButton
      variant="contained"
      preset={preset}
      sx={{
        ...theme.typography.base.md,
        borderRadius: theme.spacing(4),
        padding: theme.spacing(1, 2.5),
        flexWrap: "nowrap",
        textWrap: "nowrap",
        width: "fit-content",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
      {...rest}
    >
      {children}
    </ColorButton>
  );
};
