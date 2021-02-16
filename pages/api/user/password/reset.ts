import bcrypt from "bcryptjs";
import nc from "next-connect";
import { database } from "../../../../api//middlewares/index";
import { NextApiResponse } from "next";
import {
  deletePasswordResetToken,
  getUserById,
  insertResetPasswordToken,
  sendResetPasswordEmail,
  updateUserPassword,
} from "../../../../api/services/usersService";

const handler = nc();

handler.use(database);

interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string; token: any };
  db: any;
  logIn: any;
  user: any;
  file: any;
}

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const user = await getUserById(req.db, req.body.email);
  if (!user) {
    res.status(401).json({ error: "The email is not found" });
    return;
  }

  const token = await insertResetPasswordToken(req.db, user._id);
  await sendResetPasswordEmail(
    user.email.toString(),
    user.name.toString(),
    token
  );
  res.end("ok");
});

handler.put(async (req: ExtendedRequest, res: NextApiResponse) => {
  // password reset
  if (!req.body.password) {
    res.status(400).send("Password not provided");
    return;
  }

  const deletedToken = await deletePasswordResetToken(req.db, req.body.token);

  if (!deletedToken) {
    res.status(403).json({ error: "Reset password link has expired." });
    return;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  await updateUserPassword(req.db, deletedToken.creatorId, password);
  res.end("ok");
});

export default handler;
