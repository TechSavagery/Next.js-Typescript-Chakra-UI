import nc from "next-connect";
import validator from "validator";
import bcrypt from "bcryptjs";
import { all } from "../../../api/middlewares";
import {
  extractUser,
  updateUserInfo,
  createUser,
} from "../../../api/services/usersService";
import { NextApiResponse } from "next";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
debugger;
interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string };
  db: any;
  logIn: any;
  user: any;
  file: any;
}
const upload = multer({ dest: "/tmp" });
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

// GET User
handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  // Filter out password
  if (!req.user) {
    res.status(401);
    return res.json({ error: "user is not authenticated" });
  }
  const { password, ...u } = req.user;
  res.json({ user: u });
});

// PATCH User
handler.patch(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }
  let profilePicture;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: "fill",
    });
    profilePicture = image.secure_url;
  }
  const { name, bio } = req.body;

  const user = await updateUserInfo(req.db, req.user._id, name!, bio, req.file);

  res.json({ user: extractUser(user) });
});

export default handler;
