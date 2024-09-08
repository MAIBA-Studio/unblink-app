import { AuthLayout } from "@/components";
import React from "react";

// Not only events layout would need to be auth protected
const EventsLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default EventsLayout;
