import { NextApiResponse } from "next";
import nc from "next-connect";
import { all } from "../../../api/middlewares";
import {
  getAllPosts,
  insertUserPost,
} from "../../../api/services/postsService";

interface ExtendedRequest {
  body: { name: any; password: any; email: string; bio: string; content: any };
  db: any;
  logIn: any;
  user: any;
  file: any;
  query: { from: any; by: any; limit: any };
}

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  const posts = await getAllPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }

  res.send(JSON.stringify(posts, null, 2));
});

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).json({ error: "user is not authenticated" });
  }

  if (!req.body.content) {
    return res.status(400).json({ error: "You must write something" });
  }

  const post = await insertUserPost(req.db, req.body.content, req.user._id);

  return res.json({ post });
});

export default handler;
