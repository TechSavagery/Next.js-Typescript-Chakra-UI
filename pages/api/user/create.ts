import nc from "next-connect";
import validator from "validator";
import bcrypt from "bcryptjs";
import { all } from "../../../api/middlewares";
import { extractUser, createUser } from "../../../api/services/usersService";
import { NextApiResponse } from "next";
debugger;
interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string };
  db: any;
  logIn: any;
  user: any;
  file: any;
}

const handler = nc();

handler.use(all);

//Create User
handler.post<ExtendedRequest, NextApiResponse>(
  async (req: ExtendedRequest, res: NextApiResponse) => {
    const { name, password } = req.body;
    const email = validator.normalizeEmail(req.body.email).toString();
    if (!validator.isEmail(email)) {
      res.status(400).send("The email you entered is invalid.");
      return;
    }
    if (!password || !name) {
      res.status(400).send("Missing field(s)");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(req.db, {
      email,
      password: hashedPassword,
      bio: "",
      name,
    });

    if (user == String) {
      res.status(403).send(user);
    }
    req.logIn(user, (err: any) => {
      if (err) throw err;
      res.status(201).json({
        user: extractUser(req.user),
      });
    });
  }
);
export default handler;
