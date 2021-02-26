import { NextApiResponse } from "next";
import nc from "next-connect";
import { all } from "../../../api/middlewares";
import { getAllUsers } from "../../../api/services/usersService";

const handler = nc();
interface ExtendedRequest {
  user: any;
  db: any;
}

handler.use(all);

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  const users = await getAllUsers(req.db);
  res.status(200);
  res.json(JSON.stringify(users, null, 2));
});
export default handler;
