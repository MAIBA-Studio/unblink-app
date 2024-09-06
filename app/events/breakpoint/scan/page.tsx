"use client";

import { IconButton } from "@/components";
import { PATH } from "@/lib/routes";
import {
  Camera as CameraIcon,
  Cameraswitch as CameraswitchIcon,
  Collections as CollectionsIcon,
} from "@mui/icons-material";
import { Box, Container, Stack, useTheme } from "@mui/material";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const BreakpointScanPage = () => {
  const theme = useTheme();
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: isFrontCamera ? "user" : "environment",
  };

  const toggleCamera = useCallback(() => {
    setIsFrontCamera((prev) => !prev);
  }, []);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 512;
        ctx?.drawImage(img, 0, 0, 512, 512);

        let quality = 0.7;
        let compressedImage = canvas.toDataURL("image/jpeg", quality);

        while (compressedImage.length > 1.5 * 1024 * 1024 && quality > 0.1) {
          quality -= 0.1;
          compressedImage = canvas.toDataURL("image/jpeg", quality);
        }

        console.log(
          "Compressed image size:",
          compressedImage.length / 1024 / 1024,
          "MB"
        );
        // Here you can use the compressedImage (e.g., send it to a server)
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
          boxShadow: 3,
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            aspectRatio: 1,
            width: 512,
            height: 512,
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          imageSmoothing
        />
      </Box>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Link href={PATH.breakpoint}>
          <IconButton>
            <CollectionsIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Link>
        <IconButton onClick={captureImage}>
          <CameraIcon sx={{ width: 48, height: 48 }} />
        </IconButton>
        <IconButton onClick={toggleCamera}>
          <CameraswitchIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default BreakpointScanPage;
