import { NextApiResponse } from "next";
import nc from "next-connect";
import { all } from "../../../../api/middlewares";
import { getUserById } from "../../../../api/services/usersService";

const handler = nc();

handler.use(all);

const maxAge = 4 * 60 * 60; // 4 hours

interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string };
  db: any;
  logIn: any;
  user: any;
  file: any;
  query: any;
}

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    res.status(401);
    return res.json({ error: "user is not authenticated" });
  }
  const user = await getUserById(req.db, req.query.userId);
  user
    ? res.setHeader("cache-control", `public, max-age=${maxAge}`)
    : res.status(404).end();
  res.send({ user });
});

export default handler;
