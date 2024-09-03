import { BingoCard } from "@/breakpoint/bingo-card";
import { BingoMechanics } from "@/breakpoint/bingo-mechanics";
import { BingoPoints } from "@/breakpoint/bingo-points";
import { Stack } from "@mui/material";

const BreakpointPage = () => {
  return (
    <Stack rowGap={4}>
      <Stack rowGap={2}>
        <BingoPoints points={0} medals={0} />
        <BingoCard />
      </Stack>

      <BingoMechanics />
    </Stack>
  );
};

export default BreakpointPage;
