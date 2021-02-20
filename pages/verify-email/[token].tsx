import { useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { all } from "../../api/middlewares";
import PublicLayout from "../../components/layouts/PublicLayout";
import nc from "next-connect";
import { findAndDeleteTokenByIdAndType } from "../../api/repositories/tokenRepository";
import { updateUserById } from "../../api/repositories/usersRepository";
import Router from "next/router";

type EmailVerificationPageProps = {
  success: boolean;
};

export default function EmailVerificationPage(
  props: EmailVerificationPageProps
) {
  const bg = useColorModeValue("white", "#171923");

  useEffect(() => {
    if (props.success) Router.replace("/account");
  });

  return (
    <PublicLayout title="Verify-Email | Next.js + TypeScript + Chakra UI">
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          background: ${bg};
        }
      `}</style>
    </PublicLayout>
  );
}

export async function getServerSideProps(ctx: any) {
  const handler = nc();
  handler.use(all);
  await handler.run(ctx.req, ctx.res);

  const { token } = ctx.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    ctx.req.db,
    token,
    "emailVerify"
  );

  if (!deletedToken) return { props: { success: false } };

  await updateUserById(ctx.req.db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { success: true } };
}
