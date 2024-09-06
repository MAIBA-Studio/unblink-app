"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

export const BreakpointLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Stack rowGap={4} alignItems={"center"} justifyContent={"center"}>
      <Stack
        sx={{
          background: theme.palette.breakpoint?.neutral[80],
          borderRadius: theme.spacing(2),
          padding: theme.spacing(4, 0),
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: theme.shadows[4],
        }}
      >
        {/* BG Images */}
        <Image
          src={"/assets/events/solana-breakpoint-2024/bg-gradient.png"}
          alt={"Gradient"}
          fill
          objectFit="cover"
          objectPosition="center"
          style={{
            opacity: 1,
            zIndex: 1,
          }}
        />
        <Image
          src={"/assets/events/solana-breakpoint-2024/grid.png"}
          alt={"Grid"}
          fill
          objectFit="cover"
          objectPosition="center"
          style={{
            opacity: 0.2,
            zIndex: 2,
          }}
        />
        <Image
          src={"/assets/events/solana-breakpoint-2024/bg-noise.png"}
          alt={"Noise"}
          fill
          objectFit="cover"
          objectPosition="center"
          style={{
            opacity: 1,
            zIndex: 3,
          }}
        />

        <Stack
          sx={{
            zIndex: 4,
            rowGap: theme.spacing(4),
            alignItems: "center",
            width: "100%",
          }}
        >
          <Stack
            rowGap={2}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              src={"/assets/events/solana-breakpoint-2024/logo-breakpoint.png"}
              alt={"Gradient"}
              width={1561}
              height={747}
              style={{
                height: "64px",
                width: "fit-content",
              }}
            />
            <Typography
              sx={{
                ...theme.typography.base.lg,
                letterSpacing: "1em",
                textAlign: "center",
                textTransform: "uppercase",
                padding: theme.spacing(0.5),
                background: theme.palette.breakpoint?.gradient?.purple,
                width: "100%",
              }}
            >
              Bingo
            </Typography>
          </Stack>

          <Box
            sx={{
              padding: theme.spacing(0, 3),
            }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
