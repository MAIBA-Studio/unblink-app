"use client";

import { IconButton, OutlineButton, SolidButton } from "@/components";
import { PATH } from "@/lib/routes";
import {
  Camera as CameraIcon,
  Cameraswitch as CameraswitchIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { Box, Container, Stack, useTheme } from "@mui/material";
import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const BreakpointScanPage = () => {
  const theme = useTheme();
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: isFrontCamera ? "user" : "environment",
  };

  const toggleCamera = useCallback(() => {
    setIsFrontCamera((prev) => !prev);
  }, []);

  const handleTryAgain = () => {
    setCapturedImage(null);
  };

  const handleUseImage = () => {
    // TODO: Call API to upload image, fill the slots of the user and count the points
    // router.push(PATH.breakpoint);
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: 1080,
      height: 1080,
    });
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 1080;
        canvas.height = 1080;
        ctx?.drawImage(img, 0, 0, 1080, 1080);

        let quality = 1;
        let compressedImage = canvas.toDataURL("image/jpeg", quality);

        // Make sure the image is less than 2MB
        while (compressedImage.length > 2 * 1024 * 1024 && quality > 0.9) {
          quality -= 0.02;
          compressedImage = canvas.toDataURL("image/jpeg", quality);
        }

        // Double multiplication and division by 1024 is used to convert bytes to megabytes:
        // First 1024 converts bytes to kilobytes, second 1024 converts kilobytes to megabytes
        console.log(
          "Compressed image size:",
          compressedImage.length / 1024 / 1024,
          "MB"
        );
        setCapturedImage(compressedImage);
      };
      img.src = imageSrc;
    }
  }, [webcamRef]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          width: 288,
          height: 288,
          overflow: "hidden",
          border: `1px solid ${theme.palette.breakpoint?.neutral[0]}`,
          borderRadius: theme.spacing(1),
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              aspectRatio: 1,
              width: 1080,
              height: 1080,
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <NextImage
            src={capturedImage}
            alt="captured"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </Box>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent={capturedImage ? "center" : "space-between"}
        columnGap={2}
        width="100%"
      >
        {!capturedImage ? (
          <>
            <Link href={PATH.breakpoint}>
              <IconButton>
                <ViewModuleIcon sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Link>
            <IconButton onClick={captureImage}>
              <CameraIcon sx={{ width: 48, height: 48 }} />
            </IconButton>
            <IconButton onClick={toggleCamera}>
              <CameraswitchIcon sx={{ width: 24, height: 24 }} />
            </IconButton>
          </>
        ) : (
          <>
            <OutlineButton preset="neutral" onClick={handleTryAgain}>
              Discard
            </OutlineButton>
            <SolidButton onClick={handleUseImage}>Use this</SolidButton>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default BreakpointScanPage;
