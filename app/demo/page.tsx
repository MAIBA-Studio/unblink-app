"use client";

import {
  LoaderDots,
  LoaderSkeleton,
  OutlineButton,
  SolidButton,
} from "@/components";
import { useToast } from "@/providers/toast-provider";
import { Stack, Typography, useTheme } from "@mui/material";

const StorybookPage = () => {
  const theme = useTheme();
  const { showToast } = useToast();

  const handleShowSuccessToast = () => {
    showToast(
      "success",
      true,
      "Toast Title",
      "Successful toast message goes here"
    );
  };

  const handleShowErrorToast = () => {
    showToast("error", true, "Toast Title", "Error toast message goes here");
  };

  const handleShowWarningToast = () => {
    showToast(
      "warning",
      true,
      "Toast Title",
      "Warning toast message goes here"
    );
  };

  const handleShowInfoToast = () => {
    showToast("info", true, "Toast Title", "Info toast message goes here");
  };

  const handleShowLoadingToast = () => {
    showToast(
      "info",
      true,
      "Toast Title",
      "Info toast message goes here",
      true
    );
  };

  return (
    <Stack rowGap={4} padding={4}>
      <Typography sx={theme.typography.base.xl}>Solid Buttons</Typography>
      <Stack flexDirection={"row"} columnGap={2}>
        <SolidButton preset={"purple"}>Purple</SolidButton>
        <SolidButton preset={"green"}>Green</SolidButton>
        <SolidButton preset={"cyan"}>Cyan</SolidButton>
        <SolidButton preset={"neutral"}>Neutral</SolidButton>
      </Stack>
      <Stack flexDirection={"row"} columnGap={2}>
        <SolidButton preset={"purple"} disabled>
          Purple
        </SolidButton>
        <SolidButton preset={"green"} disabled>
          Green
        </SolidButton>
        <SolidButton preset={"cyan"} disabled>
          Cyan
        </SolidButton>
        <SolidButton preset={"neutral"} disabled>
          Neutral
        </SolidButton>
      </Stack>

      <Typography sx={theme.typography.base.xl}>Outlined Buttons</Typography>
      <Stack flexDirection={"row"} columnGap={2}>
        <OutlineButton preset={"purple"}>Purple</OutlineButton>
        <OutlineButton preset={"green"}>Green</OutlineButton>
        <OutlineButton preset={"cyan"}>Cyan</OutlineButton>
        <OutlineButton preset={"neutral"}>Neutral</OutlineButton>
      </Stack>
      <Stack flexDirection={"row"} columnGap={2}>
        <OutlineButton preset={"purple"} disabled>
          Purple
        </OutlineButton>
        <OutlineButton preset={"green"} disabled>
          Green
        </OutlineButton>
        <OutlineButton preset={"cyan"} disabled>
          Cyan
        </OutlineButton>
        <OutlineButton preset={"neutral"} disabled>
          Neutral
        </OutlineButton>
      </Stack>

      <Typography sx={theme.typography.base.xl}>Loaders</Typography>
      <Stack
        rowGap={4}
        width={"100%"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <LoaderDots />
        <Stack flexDirection={"row"} columnGap={2}>
          <LoaderSkeleton variant="circular" size="small" />
          <LoaderSkeleton variant="circular" size="medium" />
          <LoaderSkeleton variant="circular" size="large" />
        </Stack>
        <Stack flexDirection={"row"} columnGap={2}>
          <LoaderSkeleton variant="rectangular" size="small" />
          <LoaderSkeleton variant="rectangular" size="medium" />
          <LoaderSkeleton variant="rectangular" size="large" />
        </Stack>
        <Stack flexDirection={"row"} columnGap={2}>
          <LoaderSkeleton variant="rounded" size="small" />
          <LoaderSkeleton variant="rounded" size="medium" />
          <LoaderSkeleton variant="rounded" size="large" />
        </Stack>
      </Stack>

      <Typography sx={theme.typography.base.xl}>Toasts</Typography>
      <Stack flexDirection={"row"} gap={2} width={"100%"} flexWrap={"wrap"}>
        <SolidButton preset={"green"} onClick={handleShowSuccessToast}>
          Show Success Toast
        </SolidButton>
        <SolidButton preset={"purple"} onClick={handleShowErrorToast}>
          Show Error Toast
        </SolidButton>
        <SolidButton preset={"neutral"} onClick={handleShowWarningToast}>
          Show Warning Toast
        </SolidButton>
        <SolidButton preset={"cyan"} onClick={handleShowInfoToast}>
          Show Info Toast
        </SolidButton>
        <SolidButton preset={"cyan"} onClick={handleShowLoadingToast}>
          Show Loading Toast
        </SolidButton>
      </Stack>

      <Typography sx={theme.typography.base.xl}>Typography</Typography>
      <Stack rowGap={2}>
        <Typography sx={theme.typography.display.title}>
          This is a sample Title text
        </Typography>
        <Typography sx={theme.typography.display.heading}>
          This is a sample Heading text
        </Typography>
        <Typography sx={theme.typography.display.body}>
          This is a sample Body text
        </Typography>
        <Typography sx={theme.typography.base.xxl}>
          This is a sample XXL text
        </Typography>
        <Typography sx={theme.typography.base.xl}>
          This is a sample XL text
        </Typography>
        <Typography sx={theme.typography.base.lg}>
          This is a sample LG text
        </Typography>
        <Typography sx={theme.typography.base.md}>
          This is a sample MD text
        </Typography>
        <Typography sx={theme.typography.base.sm}>
          This is a sample SM text
        </Typography>
        <Typography sx={theme.typography.base.xs}>
          This is a sample XS text
        </Typography>
        <Typography sx={theme.typography.base.mono}>
          This is a sample Mono text
        </Typography>
        <Typography sx={theme.typography.base.tag}>
          This is a sample Tag text
        </Typography>
        <Typography sx={theme.typography.base.link}>
          This is a sample Link text
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StorybookPage;
