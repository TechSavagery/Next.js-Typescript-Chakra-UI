import { NextApiResponse } from "next";
import nc from "next-connect";
import { all } from "../../../../api/middlewares";
import {
  insertEmailVerificationToken,
  sendEmailVerification,
} from "../../../../api/services/usersService";
const handler = nc();

handler.use(all);
interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string };
  db: any;
  logIn: any;
  user: any;
  file: any;
}

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    res.json(401);
    res.send("user is not authenticated");
    return;
  }

  const token = await insertEmailVerificationToken(req.db, req.user._id);
  await sendEmailVerification(req.user.email, req.user.name, token._id);
  res.end("ok");
});

export default handler;
