"use client";

import { Box, keyframes, Stack, useTheme } from "@mui/material";
import Image from "next/image";

export const Splash = () => {
  const theme = useTheme();

  const pulse = keyframes`
    0% {
      transform: scale(1);
    }
      50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  `;

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          animation: `${pulse} 800ms ease-in-out`,
          animationIterationCount: "infinite",
        }}
      >
        <Image
          src="/assets/the-bobo-bot.jpeg"
          alt="splash"
          width={500}
          height={500}
          style={{
            width: 200,
            height: 200,
            borderRadius: theme.spacing(2),
          }}
          priority
        />
      </Box>
    </Stack>
  );
};
