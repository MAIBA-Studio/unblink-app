"use client";

import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
import { AlertType } from "@/providers/toast-provider";
import { styled } from "@mui/material";
import { FC } from "react";

interface IWrapperProps {
  borderWidth: number;
  alertType?: AlertType;
}

const Wrapper = styled("div", {
  shouldForwardProp: shouldNotForwardPropsWithKeys([
    "alertType",
    "borderWidth",
  ]),
})<IWrapperProps>(({ theme, borderWidth, alertType, className }) => {
  let styles = {
    padding: `${borderWidth}px`,
    background: theme.palette.neutral[80],
  };

  switch (alertType) {
    case "success":
      styles.background = theme.palette.success.main;
      break;
    case "error":
      styles.background = theme.palette.danger.main;
      break;
    case "warning":
      styles.background = theme.palette.warning.main;
      break;
    case "info":
      styles.background = theme.palette.info.main;
      break;
    default:
      styles.background = "";
      break;
  }

  return styles;
});

export interface IBorderWrapperProps {
  children: React.ReactNode;
  borderWidth: number;
  alertType?: AlertType;
  className: string;
}

export const BorderWrapper: FC<IBorderWrapperProps> = ({
  children,
  borderWidth,
  alertType,
  className,
}) => {
  return (
    <Wrapper
      alertType={alertType}
      borderWidth={borderWidth}
      className={className}
    >
      {children}
    </Wrapper>
  );
};
