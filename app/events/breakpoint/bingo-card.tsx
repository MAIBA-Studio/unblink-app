"use client";

import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

// TODO: Replace with booth_id and actual logos from database
const logos = new Map([
  [0, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [1, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [2, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [3, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [4, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [5, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [6, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [7, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
  [8, "/assets/events/solana-breakpoint-2024/logo-breakpoint.png"],
]);

const BingoSlot = ({ logo, index }: { logo: string; index: number }) => (
  <Grid item xs={4}>
    <Paper
      sx={(theme) => ({
        minHeight: 80,
        height: 0,
        background: theme.palette.breakpoint?.neutral[80],
        borderRadius: theme.spacing(1),
        borderWidth: 0.5,
        borderStyle: "solid",
        borderImage: theme.palette.breakpoint?.gradient?.solana
          ? `${theme.palette.breakpoint.gradient.solana} 1`
          : "none",
        boxSizing: "border-box",
        padding: theme.spacing(1),
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      })}
    >
      <Image
        src={logo}
        alt={`Company logo ${index + 1}`}
        width={100}
        height={100}
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
      />
    </Paper>
  </Grid>
);

export const BingoCard = () => {
  const gridItems = useMemo(
    () =>
      Array.from(logos.entries()).map(([index, logo]) => (
        <BingoSlot key={index} logo={logo} index={index} />
      )),
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {gridItems}
      </Grid>
    </Box>
  );
};
