"use client";

import { Box, keyframes, styled } from "@mui/material";

const EllipsisAnim = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Ellipsis = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "fit-content",
  columnGap: theme.spacing(0.5),
  [`> div`]: {
    background: theme.palette.neutral[20],
    height: "8px",
    width: "8px",
    borderRadius: "50%",
    opacity: 0,
    animationName: EllipsisAnim,
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
    "&:nth-child(1)": {
      animationDelay: "0s",
    },
    "&:nth-child(2)": {
      animationDelay: "0.1s",
    },
    "&:nth-child(3)": {
      animationDelay: "0.2s",
    },
  },
}));

export const LoaderDots = () => {
  return (
    <Ellipsis>
      <Box />
      <Box />
      <Box />
    </Ellipsis>
  );
};
