import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "public/profile-512x512.png";
import { ComponentProps } from "react";

type LogoProps = {
  size?: string;
} & Partial<ComponentProps<typeof Image>>;

export default function Logo({ size = "120px", ...restProps }: LogoProps) {
  return (
    <Link href="/">
      <Box boxSize={size} position="relative" flexShrink="0">
        <Image fill src={LogoImg} alt="로고" sizes={size} {...restProps} />
      </Box>
    </Link>
  );
}
