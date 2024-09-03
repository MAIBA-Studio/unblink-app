"use client";

// react
import { ReactNode } from "react";

// theme
import "@/styles/globals.css";
import breakpoints from "@/theme/breakpoints";
import palette from "@/theme/palette";
import typography from "@/theme/typography";

// @mui
import { CssBaseline } from "@mui/material";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";

interface IUnblinkThemeProvider {
  children: ReactNode;
}

export const getTheme = () => {
  const themeOptions: ThemeOptions = {
    palette,
    typography,
    breakpoints,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: palette.neutral[0],
            backgroundColor: palette.neutral[80],
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiSkeleton: {
        defaultProps: {
          height: 16,
          width: 50,
          sx: (theme) => ({
            bgcolor: theme.palette.neutral[40],
          }),
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  return theme;
};

const UnblinkThemeProvider = ({ children }: IUnblinkThemeProvider) => {
  const unblinkTheme = getTheme();

  return (
    <ThemeProvider theme={unblinkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default UnblinkThemeProvider;
