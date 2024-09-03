import { BreakpointLayout as BaseBreakpointLayout } from "@/components";
import { ReactNode } from "react";

const BreakpointLayout = ({ children }: { children: ReactNode }) => {
  return <BaseBreakpointLayout>{children}</BaseBreakpointLayout>;
};

export default BreakpointLayout;
