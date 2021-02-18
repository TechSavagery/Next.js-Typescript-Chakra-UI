import nc from "next-connect";
import { all } from "../../../api/middlewares";
import {
  extractUser,
  updateUserInfo,
} from "../../../api/services/usersService";
import { NextApiResponse } from "next";
import multer from "multer";
debugger;
interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string };
  db: any;
  logIn: any;
  user: any;
  file: any;
}

const handler = nc();
const upload: any = multer({ dest: "/tmp" });

handler.use(all);

// GET User
handler.get((req: ExtendedRequest, res: NextApiResponse) => {
  // Filter out password
  if (!req.user) {
    res.status(401);
    return res.json({ error: "user is not authenticated" });
  }
  const { password, ...u } = req.user;
  res.json({ user: u });
});

// PATCH User
handler.patch(
  upload.single("profilePicture"),
  async (req: ExtendedRequest, res: NextApiResponse) => {
    if (!req.user) {
      res.status(401).end();
      return;
    }
    const { name, bio } = req.body;

    const user = await updateUserInfo(
      req.db,
      req.user._id,
      name!,
      bio,
      req.file
    );

    res.json({ user: extractUser(user) });
  }
);
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
