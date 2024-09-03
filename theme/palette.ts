"use client";

import { PaletteOptions } from "@mui/material/styles/createPalette";
import breakpointPalette from "./event-palettes/breakpoint-palette";

interface PaletteColorVariants {
  0: string;
  20: string;
  40: string;
  60: string;
  80: string;
}

interface NeutralColorVariants {
  0: string;
  20: string;
  40: string;
  60: string;
  80: string;
}

interface GradientVariants {
  blue: string;
  purple: string;
  solana?: string;
}

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    green?: string;
    purple?: string;
    blue?: string;
    pink?: string;
    lightPurple?: string;
    cyan?: string;
    neutral: string;
    success?: string;
    warning?: string;
    danger?: string;
    info?: string;
    gradient?: string;
    transparent?: string;

    // event palettes
    breakpoint?: string;
  }

  interface Palette {
    green?: PaletteColorVariants;
    purple?: PaletteColorVariants;
    blue?: PaletteColorVariants;
    pink?: PaletteColorVariants;
    lightPurple?: PaletteColorVariants;
    cyan?: PaletteColorVariants;
    neutral: NeutralColorVariants;
    success: PaletteColor;
    warning: PaletteColor;
    danger: PaletteColor;
    info: PaletteColor;
    gradient?: GradientVariants;

    // event palettes
    breakpoint?: PaletteOptions;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    green?: PaletteColorVariants;
    purple?: PaletteColorVariants;
    blue?: PaletteColorVariants;
    pink?: PaletteColorVariants;
    lightPurple?: PaletteColorVariants;
    cyan?: PaletteColorVariants;
    neutral: NeutralColorVariants;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    danger?: PaletteColorOptions;
    info?: PaletteColorOptions;
    gradient?: GradientVariants;

    // event palettes
    breakpoint?: PaletteOptions;
  }
}

declare module "@mui/material" {
  interface Color {
    green: true;
    purple: true;
    blue: true;
    pink: true;
    lightPurple: true;
    cyan: true;
    neutral: true;
    success: true;
    warning: true;
    danger: true;
    info: true;
    gradient: true;
    breakpoint: true;
  }
}

const green: PaletteColorVariants = {
  0: "#E8FCF5",
  20: "#C3FAE5",
  40: "#79F2C4",
  60: "#15F095",
  80: "#00945B",
};

const purple: PaletteColorVariants = {
  0: "#eeeaf4",
  20: "#d7caec",
  40: "#C5A5F9",
  60: "#7645d9",
  80: "#341062",
};

const blue: PaletteColorVariants = {
  0: "#D2EEFA",
  20: "#9BD8F2",
  40: "#76C8EB",
  60: "#38A0CC",
  80: "#197AA3",
};

const cyan: PaletteColorVariants = {
  0: "#D2EEFA",
  20: "#80E5E5",
  40: "#2BFFFF",
  60: "#1ACCCC",
  80: "#1A9999",
};

const neutral: NeutralColorVariants = {
  0: "#F5F5F5",
  20: "#D2D8E0",
  40: "#708090", // Deep, strong blue-grey, approaching charcoal
  60: "#4E5C67", // Even darker, nearing black, for deep contrast
  80: "#333333", // Nearly pure black, with the slightest blue undertone
};

const success = {
  main: "#46EB80",
  dark: "#2DBA5C",
  light: "#6FFFA0",
};

const warning = {
  main: "#D4A017",
  dark: "#8B4513",
  light: "#FFB06F",
};

const danger = {
  main: "#EB4646",
  dark: "#BA2D2D",
  light: "#FF6F6F",
};

const info = {
  main: "#46BAEB",
  dark: "#2D8ABA",
  light: "#6FD4FF",
};

const gradient: GradientVariants = {
  blue: "linear-gradient(90deg, rgba(42,91,183,1) 0%, rgba(43,255,255,1) 100%)",
  purple:
    "linear-gradient(90deg, rgba(119,42,183,1) 0%, rgba(230,43,190,1) 65%, rgba(222,43,255,1) 100%)",
};

const palette: PaletteOptions = {
  green,
  purple,
  blue,
  cyan,
  neutral,
  success,
  warning,
  danger,
  info,
  gradient,

  // event palettes
  breakpoint: breakpointPalette,
} as const;

export default palette;
