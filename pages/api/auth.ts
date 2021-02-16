import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { all } from "../../api/middlewares";
import passport from "../../api/middlewares/passport";
import { extractUser } from "../../api/services/usersService";

const handler = nc();
interface ExtendedRequest {
  user: any;
}

handler.use(all);

//Login
handler.post(
  passport.authenticate("local"),
  (req: ExtendedRequest, res: NextApiResponse) => {
    res.json({ user: extractUser(req.user) });
  }
);

//Logout
handler.delete((_req: NextApiRequest, res: NextApiResponse) => {
  //Changelogout to remove session cookie method
  res.status(204).end();
});

export default handler;
