"use client";

import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
import { AlertType } from "@/providers/toast-provider";
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  HighlightOff as HighlightOffIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Snackbar,
  snackbarClasses,
  styled,
  useTheme,
} from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { FC, ReactNode } from "react";

const Wrapper = styled("div")<{ alertType?: AlertType }>(
  ({ theme, alertType }) => {
    let borderColor = theme.palette.neutral[80];

    switch (alertType) {
      case "success":
        borderColor = theme.palette.success.main;
        break;
      case "error":
        borderColor = theme.palette.danger.main;
        break;
      case "warning":
        borderColor = theme.palette.warning.main;
        break;
      case "info":
      default:
        borderColor = theme.palette.info.main;
        break;
    }

    return {
      display: "flex",
      backgroundColor: theme.palette.neutral[80],
      color: theme.palette.neutral[0],
      border: `1px solid ${borderColor}`,
      borderRadius: "8px",
      width: "100%",
      boxShadow: "0px 4px 4px #00000040",
      padding: theme.spacing(1.5),
      gap: "12px",
    };
  }
);

const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
}));

const Title = styled(Typography, {
  shouldForwardProp: shouldNotForwardPropsWithKeys(["alertType"]),
})<{ alertType?: AlertType }>(({ theme, alertType }) => {
  let color = theme.palette.success.main;

  switch (alertType) {
    case "success":
      color = theme.palette.success.main;
      break;
    case "error":
      color = theme.palette.danger.main;
      break;
    case "warning":
      color = theme.palette.warning.main;
      break;
    case "info":
      color = theme.palette.info.main;
      break;
  }

  return {
    ...theme.typography.base.sm,
    color: color,
  };
});

const IconWrapper = styled("div")(() => ({
  borderRadius: "12px",
}));

const MessageWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  gap: "4px",
}));

export const Content = styled(Typography)<{ alertType?: AlertType }>(
  ({ theme }) => ({
    ...theme.typography.base.xs,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.neutral[20],
    position: "relative",
    width: "100%",
  })
);

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  alignItems: "flex-start",
  color: theme.palette.neutral[40],
  height: "8px",
  width: "8px",
}));

interface IToastProps {
  alertType?: AlertType;
  children?: ReactNode;
  title: string;
  open: boolean;
  isClosable?: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const Toast: FC<IToastProps> = ({
  alertType,
  children,
  title,
  isClosable = false,
  open,
  onClose,
  isLoading = false,
}) => {
  const theme = useTheme();
  const AlertIcon = () => {
    if (isLoading)
      return (
        <CircularProgress
          size={14}
          thickness={5}
          sx={(theme) => ({
            padding: 0,
            marginLeft: theme.spacing(0.5),

            color: theme.palette.warning.main,
            alignSelf: "flex-start",
          })}
        />
      );

    switch (alertType) {
      case "success":
        return (
          <CheckCircleIcon
            sx={{
              position: "relative",
              color: theme.palette.success.main,
              width: "20px",
              height: "20px",
              alignSelf: "flex-start",
            }}
          />
        );
      case "warning":
        return (
          <WarningIcon
            height={16}
            width={16}
            sx={{
              position: "relative",
              color: theme.palette.warning.main,
              width: "20px",
              height: "20px",
              alignSelf: "flex-start",
            }}
          />
        );
      case "error":
        return (
          <HighlightOffIcon
            height={16}
            width={16}
            sx={{
              position: "relative",
              color: theme.palette.danger.main,
              width: "20px",
              height: "20px",
              alignSelf: "flex-start",
            }}
          />
        );
      case "info":
        return (
          <InfoIcon
            height={16}
            width={16}
            sx={{
              position: "relative",
              color: theme.palette.info.main,
              width: "20px",
              height: "20px",
              alignSelf: "flex-start",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={isClosable ? null : 6000}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={(theme) => ({
        [`&.${snackbarClasses.anchorOriginBottomLeft}`]: {
          bottom: theme.spacing(8),
          left: theme.spacing(4),
        },
        zIndex: 1000000,
      })}
    >
      <Wrapper alertType={alertType}>
        <ContentWrapper>
          <AlertIcon />
          <MessageWrapper>
            <Title alertType={alertType}> {title} </Title>
            <Content>{children}</Content>
          </MessageWrapper>

          {isClosable && (
            <IconWrapper sx={{ position: "absolute", right: 16, top: 2 }}>
              <CloseIconButton
                aria-label="toast-close"
                size="small"
                onClick={onClose}
              >
                <CloseIcon
                  sx={{
                    height: 16,
                    width: 16,
                  }}
                />
              </CloseIconButton>
            </IconWrapper>
          )}
        </ContentWrapper>
      </Wrapper>
    </Snackbar>
  );
};
