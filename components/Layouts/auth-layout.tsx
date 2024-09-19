"use client";

import { Container, SolidButton, WalletButton } from "@/components";
import useProfile from "@/hooks/useProfile";
import { PATH } from "@/lib/routes";
import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
import { useToast } from "@/providers/toast-provider";
import { useGlobalStore } from "@/store";
import { useWallet } from "@jup-ag/wallet-adapter";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EventAvailable as EventAvailableIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  VerifiedUser as VerifiedUserIcon,
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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

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
  const { connected, publicKey: userAddress, connecting } = useWallet();
  const { isSignedIn, profile, signIn, registerProfile } = useProfile();
  const { setSession, setStatus, resetAuthState, setIsSignedIn } =
    useGlobalStore();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const router = useRouter();
  const [hasTemporaryRegistered, setHasTemporaryRegistered] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = scrollContainerRef.current?.scrollTop || 0;
    const scrollThreshold = 1;

    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // For desktop
    window.addEventListener("scroll", handleScroll, { passive: true });

    // For mobile
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("touchend", handleScroll, { passive: true });

    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("touchend", handleScroll);
    };
  }, [handleScroll]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleVerify = async () => {
    await signIn();
  };

  const handleSignIn = async () => {
    await signIn();
  };

  useEffect(() => {
    const handleAuthState = async () => {
      if (
        connected &&
        status === "unauthenticated" &&
        !!userAddress?.toBase58()
      ) {
        await signIn();
      } else if (
        !connected &&
        !userAddress?.toBase58() &&
        status === "authenticated"
      ) {
        // Reset authentication store to initial state when user disconnects
        await signOut({ redirect: false });
        localStorage.removeItem("userAddress");
        setIsSignedIn(false);
        resetAuthState();
      }
    };

    // Only run the effect when the status is not "loading"
    if (status !== "loading" && !connecting) {
      handleAuthState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, connecting, status, userAddress]);

  // Update user session
  useEffect(() => {
    setSession(session);
    setStatus(status);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  // Check if user exists, if not, show the username input first
  // TODO: Check if profile is already registered, if yes, then don't show the username input

  if (!connected || !isSignedIn || !profile) {
    return (
      <Container>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          width={"100%"}
          rowGap={4}
        >
          <Stack
            sx={{
              boxShadow: theme.shadows[4],
              width: "100%",
              rowGap: theme.spacing(2),
              padding: theme.spacing(3),
              borderRadius: theme.spacing(2),
              backgroundColor: theme.palette.neutral[0],
              border: `1px solid ${theme.palette.neutral[40]}`,
            }}
          >
            <Image
              src={"/assets/logo/full-logo.png"}
              alt={"Unblink.app"}
              width={1500}
              height={500}
              style={{
                height: "fit-content",
                width: "100%",
                borderRadius: theme.spacing(1),
              }}
            />
            <Typography
              sx={{
                ...theme.typography.base.xxl,
                color: theme.palette.neutral[80],
                textAlign: "center",
              }}
            >
              Welcome to Unblink&apos;s Breakpoint Bingo!
            </Typography>
          </Stack>
          <Typography
            sx={{
              ...theme.typography.base.md,
              color: theme.palette.neutral[0],
              textAlign: "center",
            }}
          >
            To continue, please connect your wallet and sign to prove ownership.
          </Typography>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            rowGap={2}
            width={"100%"}
          >
            <WalletButton sx={{ width: "100%" }} />
            {connected && !isSignedIn && (
              <SolidButton
                preset="neutral"
                startIcon={<VerifiedUserIcon />}
                fullWidth
                onClick={handleVerify}
                sx={{
                  width: "100%",
                }}
              >
                Verify Ownership
              </SolidButton>
            )}

            {connected && isSignedIn && !profile && (
              <SolidButton
                preset="neutral"
                startIcon={<VerifiedUserIcon />}
                fullWidth
                onClick={handleSignIn}
                sx={{
                  width: "100%",
                }}
              >
                Sign In
              </SolidButton>
            )}
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* If the pathname includes '/scan', it is a camera page so don't show the header */}
      {!pathname.includes("/scan") && (
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
              transition: "transform 0.3s ease-in-out",
              transform: isVisible ? "translateY(0)" : "translateY(-200%)",
            }}
          >
            <Link href={PATH.landing}>
              <Image
                src={"/assets/logo/full-logo.png"}
                alt={"Unblink.app"}
                width={100}
                height={100}
                style={{ height: "100%", width: "fit-content" }}
              />
            </Link>

            <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
              {connected ? (
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
              ) : (
                <WalletButton />
              )}
            </Stack>
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
                position: "fixed",
              },
              "& .MuiPaper-root": {
                position: "fixed",
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
              <WalletButton />
              <Link href={PATH.landing}>
                <LinkTypography selected={pathname === PATH.landing}>
                  <HomeIcon /> Home
                </LinkTypography>
              </Link>
              {/* <Link href={PATH.profile}>
            <LinkTypography selected={pathname === PATH.profile}>
              <AccountCircleIcon /> Profile
            </LinkTypography>
          </Link> */}
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
        </>
      )}

      <Box
        sx={{
          margin: !pathname.includes("/scan") ? theme.spacing(12, 0) : 0,
          zIndex: 999,
        }}
      >
        {children}
      </Box>
    </div>
  );
};
