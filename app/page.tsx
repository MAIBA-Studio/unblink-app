"use client";

import { OutlineButton } from "@/components";
import { PATH } from "@/lib/routes";
import XIcon from "@mui/icons-material/X";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
        rowGap: theme.spacing(6),
        position: "relative",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: 240,
            width: 240,
            position: "relative",
          }}
        >
          <Image
            src="/assets/logo/animated.gif"
            alt="Animated Logo"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
        </Box>
        <Typography
          sx={{
            ...theme.typography.base.xl,
            color: theme.palette.neutral[0],
            textAlign: "center",
          }}
        >
          Mint the moment. UnBlink.
        </Typography>
      </Stack>

      <Typography
        sx={{
          ...theme.typography.base.xxl,
          color: theme.palette.warning.main,
          textAlign: "center",
        }}
      >
        - - -
      </Typography>

      <Stack
        rowGap={4}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        {/* <Link href={PATH.breakpoint}> */}
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(-2),
            right: theme.spacing(-2),
            background: theme.palette.neutral[0],
            borderRadius: theme.spacing(2),
            color: theme.palette.neutral[80],
            padding: theme.spacing(1, 2.5),
            zIndex: 100,
          }}
        >
          Soon!
        </Box>
        <Link href={"#"}>
          <OutlineButton
            preset="warning"
            sx={{ padding: "32px", boxShadow: "3px 5px 0px 3px #D4A017" }}
          >
            <Image
              src={"/assets/events/solana-breakpoint-2024/logo-breakpoint.png"}
              alt={"Breakpoint Logo"}
              width={1561}
              height={747}
              style={{
                height: "100px",
                width: "fit-content",
              }}
            />
          </OutlineButton>
        </Link>
        <Link href={PATH.external.shareOnX} target="_blank" rel="noopener">
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            columnGap={1}
            sx={{
              cursor: "pointer",
              ":hover": {
                transform: "scale(1.02)",
                transition: "transform 0.3s ease-in-out",
                filter: "brightness(1.1)",
              },
            }}
          >
            <Typography
              sx={{
                ...theme.typography.base.xl,
                color: theme.palette.warning.main,
                textAlign: "center",
              }}
            >
              Share #BreakpointBingo on
            </Typography>
            <XIcon
              sx={{
                fontSize: "28px",
                padding: theme.spacing(0.75),
                borderRadius: "50%",
                background: "#000",
                color: theme.palette.neutral[0],
              }}
            />
          </Stack>
        </Link>
      </Stack>

      <Typography
        sx={{
          ...theme.typography.base.md,
          color: theme.palette.neutral[20],
          textAlign: "center",
          padding: theme.spacing(0, 2),
        }}
      >
        Capture life&apos;s authentic moments, mint them as unique NFTs on
        Solana, and earn royalties through shared, unfiltered photographic
        experiences.
      </Typography>

      <Typography
        sx={{
          ...theme.typography.base.xxl,
          color: theme.palette.warning.main,
          textAlign: "center",
        }}
      >
        - - -
      </Typography>

      <Box
        sx={{
          paddingBottom: theme.spacing(8),
        }}
      >
        <Link href={PATH.external.maibaStudio} target="_blank" rel="noopener">
          <Image
            src={"/assets/logo/maiba-studio-logo.png"}
            alt={"Maiba Studio Logo"}
            width={4500}
            height={1500}
            style={{
              height: "100px",
              width: "fit-content",
            }}
          />
        </Link>
      </Box>
    </Stack>
  );
}
