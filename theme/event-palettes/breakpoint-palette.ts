"use client";

import { PaletteOptions } from "@mui/material/styles/createPalette";

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
  solana: string;
}

const green: PaletteColorVariants = {
  0: "#E6FCF5",
  20: "#99F5D1",
  40: "#14F195",
  60: "#11C07A",
  80: "#063D2A",
};

const purple: PaletteColorVariants = {
  0: "#F1E6FF",
  20: "#C29EFF",
  40: "#9945FF",
  60: "#732FCC",
  80: "#2E134D",
};

const blue: PaletteColorVariants = {
  0: "#E6F9FC",
  20: "#A3EAF5",
  40: "#66DBEF",
  60: "#41AFC5",
  80: "#1B4F59",
};

const pink: PaletteColorVariants = {
  0: "#FAE6FF",
  20: "#F0A6FF",
  40: "#E477FF",
  60: "#B85ECC",
  80: "#532659",
};

const lightPurple: PaletteColorVariants = {
  0: "#F4EFFF",
  20: "#DBC5FC",
  40: "#C5A5F9", // Provided
  60: "#9B7CCD",
  80: "#4A3A6B", // Much darker shade
};

const neutral: NeutralColorVariants = {
  0: "#FFFFFF",
  20: "#D2D8E0",
  40: "#4E5C67", // Deep, strong blue-grey, approaching charcoal
  60: "#1F2A32", // Even darker, nearing black, for deep contrast
  80: "#000000", // Nearly pure black, with the slightest blue undertone
};

const success = {
  main: "#46EB80",
  dark: "#2DBA5C",
  light: "#6FFFA0",
};

const warning = {
  main: "#EB9147",
  dark: "#BA6F2D",
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
  purple: "linear-gradient(90deg, #DA8AFF 0%, #9945FF 65%, #7300FF 100%)",
  solana: "linear-gradient(90deg, #9945FF 0%, #64A8F2 50%, #14F195 100%)",
};

const palette: PaletteOptions = {
  green,
  purple,
  blue,
  pink,
  lightPurple,
  neutral,
  success,
  warning,
  danger,
  info,
  gradient,
} as const;

export default palette;
