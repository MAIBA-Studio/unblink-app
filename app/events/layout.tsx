import { AuthLayout } from "@/components";
import React from "react";

const EventsLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default EventsLayout;
