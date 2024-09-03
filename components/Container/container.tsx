"use client";

import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface IContainer {
  children: ReactNode;
  sx?: SxProps;
}

export const Container = ({ children, sx }: IContainer) => {
  return (
    <Stack
      component="main"
      sx={{
        display: "flex",
        margin: "0 auto",
        width: "100%",
        height: "100vh",
        maxWidth: "560px",
        boxSizing: "border-box",
        position: "relative",
        padding: "16px",
        overflowX: "hidden",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
