"use client";

import { Container, SolidButton, TextInput, WalletButton } from "@/components";
import { PATH } from "@/lib/routes";
import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
import { useWallet } from "@jup-ag/wallet-adapter";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EventAvailable as EventAvailableIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface IAuthLayout {
  children: ReactNode;
}

const LinkTypography = styled(Typography, {
  shouldForwardProp: shouldNotForwardPropsWithKeys(["selected"]),
})<{ selected: boolean }>(({ theme, selected }) => ({
  ...theme.typography.base.xl,
  display: "flex",
  alignItems: "center",
  columnGap: theme.spacing(1),
  borderRadius: theme.spacing(2),
  color: selected ? theme.palette.neutral[80] : theme.palette.neutral[0],
  padding: theme.spacing(2),
  background: selected ? theme.palette.warning.main : "transparent",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const drawerWidth = 320;

export const AuthLayout = ({ children }: IAuthLayout) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { connected } = useWallet();
  // const { user, setUser } = useStore();
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // TODO: Check the user if they are existing, if not, show the username input
  if (connected) {
    return (
      <Container>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          rowGap={2}
        >
          <TextInput label="Username" placeholder="Enter your username" />
          <Typography
            sx={{
              ...theme.typography.base.md,
              color: theme.palette.neutral[20],
            }}
          >
            This username will be used to identify you as the photographer of
            all your photos. It will be included in the metadata of the Photo
            NFT that will be minted.
          </Typography>

          {/* TODO: Once submitted, in the backend, we should redirect to the profile page or breakpoint page */}
          <SolidButton
            preset="orange"
            sx={{
              marginTop: theme.spacing(4),
              width: "100%",
            }}
          >
            Submit
          </SolidButton>
        </Stack>
      </Container>
    );
  }

  if (!connected) {
    return (
      <Container>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          rowGap={2}
        >
          <Typography
            sx={{
              ...theme.typography.base.xxl,
              color: theme.palette.neutral[0],
            }}
          >
            To continue,
          </Typography>
          <WalletButton />
        </Stack>
      </Container>
    );
  }

  return (
    <>
      <Stack
        sx={{
          position: "fixed",
          boxShadow: theme.shadows[4],
          padding: theme.spacing(1, 2),
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          background: theme.palette.neutral[80],
          borderRadius: theme.spacing(1),
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Image
          src={"/assets/logo/full-logo.png"}
          alt={"Unblink.app"}
          width={100}
          height={100}
          style={{ height: "100%", width: "fit-content" }}
        />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
        >
          <MenuIcon
            sx={{
              color: theme.palette.warning.main,
              width: 40,
              height: 40,
            }}
          />
        </IconButton>
      </Stack>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxShadow: theme.shadows[4],
            background: theme.palette.neutral[80],
            width: drawerWidth,
          },
          "& .MuiDrawer-root": {
            position: "absolute",
          },
          "& .MuiPaper-root": {
            position: "absolute",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon
                sx={{
                  width: 40,
                  height: 40,
                  color: theme.palette.neutral[0],
                }}
              />
            ) : (
              <ChevronRightIcon
                sx={{
                  width: 40,
                  height: 40,
                  color: theme.palette.neutral[0],
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Stack rowGap={2} padding={2} height={"100%"}>
          <Link href={PATH.landing}>
            <LinkTypography selected={pathname === PATH.landing}>
              <HomeIcon /> Home
            </LinkTypography>
          </Link>
          <Link href={PATH.profile}>
            <LinkTypography selected={pathname === PATH.profile}>
              <AccountCircleIcon /> Profile
            </LinkTypography>
          </Link>
          {/* TODO: Make this "Events", we're just making this "Solana Breakpoint" for now */}
          <Link href={PATH.breakpoint}>
            <LinkTypography selected={pathname === PATH.breakpoint}>
              {/* TODO: Add Breakpoint logo here instead */}
              <EventAvailableIcon />
              Solana Breakpoint
            </LinkTypography>
          </Link>
        </Stack>
      </Drawer>

      <Box
        sx={{
          marginTop: theme.spacing(12),
          zIndex: 999,
        }}
      >
        {children}
      </Box>
    </>
  );
};
