import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type MenuProps = {
  isLast?: boolean;
  to: string;
  children: React.ReactNode;
};

const MenuItems = (props: MenuProps) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

export default MenuItems;
