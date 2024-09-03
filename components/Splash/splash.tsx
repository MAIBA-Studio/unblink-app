"use client";

import {
  Box,
  keyframes,
  Stack,
  styled,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { LoaderDots } from "../Loader";

const SplashText = styled(Typography)<TypographyProps>(({ theme }) => ({
  ...theme.typography.base.xxl,
  color: theme.palette.neutral[0],
}));

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
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box>
        <Image
          src="/assets/logo/animated.gif"
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
      <Stack rowGap={4}>
        <SplashText
          sx={{
            animation: `${pulse} 1s ease-in-out`,
            animationIterationCount: "infinite",
          }}
        >
          Don&apos;t blink!
        </SplashText>
        <LoaderDots />
      </Stack>
    </Stack>
  );
};
