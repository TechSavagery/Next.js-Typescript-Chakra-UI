import nc from "next-connect";
import bcrypt from "bcryptjs";
import { all } from "../../../../api/middlewares";
import { NextApiResponse } from "next";
import { updateUserPassword } from "../../../../api/services/usersService";

const handler = nc();
handler.use(all);

interface ExtendedRequest {
  body: {
    name: any;
    password: any;
    email: string;
    bio: string;
    oldPassword: any;
    newPassword: any;
  };
  db: any;
  logIn: any;
  user: any;
  file: any;
}

handler.put(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    res.status(401).json({ error: "user is not authenticated" });
    return;
  }
  const { oldPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    res.status(401).json({ error: "Password does not match" });
  }
  const password = await bcrypt.hash(newPassword, 10);

  await updateUserPassword(req.db, req.user._id, password);

  res.end("ok");
});

export default handler;
