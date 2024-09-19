"use client";

import useProfile from "@/hooks/useProfile";
import { shortenAddress } from "@/lib/formatters";
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
  const { profile } = useProfile();

  return (
    <Stack rowGap={2}>
      Welcome, {shortenAddress(profile?.walletAddress ?? "")}
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CounterTypography>Points: {profile?.points ?? 0}</CounterTypography>
        <CounterTypography>
          Medals: {profile?.points && profile?.points > 8 ? 1 : 0}
        </CounterTypography>
      </Stack>
    </Stack>
  );
};
