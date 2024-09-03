"use client";

import { PATH } from "@/lib/routes";
import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
// import { useStore } from "@/store";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EventAvailable as EventAvailableIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

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
  background: selected ? theme.palette.green[20] : "transparent",
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
  // const { user, setUser } = useStore();
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // if (!user && (isMutatingVerify || isMutatingLogin)) {
  //   return (
  //     <Container>
  //       <Splash />
  //     </Container>
  //   );
  // }

  return (
    <>
      <Stack
        sx={{
          position: "fixed",
          boxShadow: theme.shadows[2],
          padding: theme.spacing(1, 4),
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          background: theme.palette.neutral[60],
          borderRadius: theme.spacing(1),
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Typography
          sx={{
            ...theme.typography.base.xl,
            color: theme.palette.green[20],
          }}
        >
          Unblink.app
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
        >
          <MenuIcon
            sx={{
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
            border: `1px solid ${alpha(theme.palette.neutral[40], 0.5)}`,
            boxShadow: theme.shadows[2],
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
        }}
      >
        {children}
      </Box>
    </>
  );
};
