import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { Crumb } from "../../../../../interfaces";

type BreadcrumbProps = {
  crumbs: Crumb[];
};

export default function DefaultBreadcrumb(props: BreadcrumbProps) {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");
  return (
    <Breadcrumb p="25px">
      {props.crumbs.map((crumb) => (
        <BreadcrumbItem
          key={Date.now().toString() + Math.floor(Math.random() * 10) + 1}
          bg={bg}
          color={color}
        >
          <Link href={crumb.link} passHref>
            <BreadcrumbLink>{crumb.title}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
