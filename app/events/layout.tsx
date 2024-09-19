import { AuthLayout } from "@/components";
import React from "react";

const EventsLayout = async ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default EventsLayout;
