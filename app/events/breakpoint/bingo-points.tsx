"use client";

import { Stack, styled, Typography } from "@mui/material";

const CounterTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.base.xl,
  color: theme.palette.breakpoint?.neutral[0],
}));

interface IBingoPoints {
  points: number;
  medals: number;
}

export const BingoPoints = ({ points, medals }: IBingoPoints) => {
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <CounterTypography>Points: {points}</CounterTypography>
      <CounterTypography>Medals: {medals}</CounterTypography>
    </Stack>
  );
};
