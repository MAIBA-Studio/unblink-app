import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";

export type LoaderSkeletonSize = "small" | "medium" | "large";
export type LoaderSkeletonVariant = "circular" | "rounded" | "rectangular";

interface ILoaderSkeleton extends SkeletonProps {
  size?: LoaderSkeletonSize;
  variant?: LoaderSkeletonVariant;
}

export const LoaderSkeleton = ({
  size = "medium",
  variant = "rounded",
  ...props
}: ILoaderSkeleton) => {
  switch (size) {
    case "small":
      return <Skeleton variant={variant} width={75} height={75} {...props} />;
    case "medium":
      return <Skeleton variant={variant} width={100} height={100} {...props} />;
    case "large":
      return <Skeleton variant={variant} width={125} height={125} {...props} />;
  }
};
