"use client";

import {
  IconButton as Base,
  ButtonProps,
  SxProps,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

interface IIconButton extends ButtonProps {
  children: ReactNode;
  sx?: SxProps;
}

export const IconButton = ({ children, sx, ...rest }: IIconButton) => {
  const theme = useTheme();
  return (
    <Base
      sx={{
        padding: 0,
        borderRadius: "12px",
        color: theme.palette.neutral[20],
        "&:hover": {
          background: "transparent",
          "&.MuiButton-text": {
            color: theme.palette.green?.[60],
          },
          "& path": {
            fill: theme.palette.green?.[60],
          },
        },
        "&:focus": {
          "&.MuiButton-text": {
            color: theme.palette.green?.[80],
          },
          background: "transparent",

          "& path": {
            fill: theme.palette.green?.[80],
          },
        },
        "&:disabled": {
          color: theme.palette.neutral[20],
          opacity: 0.5,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Base>
  );
};
