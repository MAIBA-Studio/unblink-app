import { OutlineButton } from "@/components";
import { PATH } from "@/lib/routes";
import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href={PATH.breakpoint}>
        <OutlineButton
          preset="warning"
          sx={{ padding: "32px", boxShadow: "3px 5px 0px 3px #D4A017" }}
        >
          <Image
            src={"/assets/events/solana-breakpoint-2024/logo-breakpoint.png"}
            alt={"Breakpoint Logo"}
            width={1561}
            height={747}
            style={{
              height: "100px",
              width: "fit-content",
            }}
          />
        </OutlineButton>
      </Link>
    </Stack>
  );
}
