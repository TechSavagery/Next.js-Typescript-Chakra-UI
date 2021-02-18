import session from "express-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

export default function sessionMiddleware(
  req: any,
  res: any,
  next: () => void
) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    secret: process.env["SESSION_SECRET"]!,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}
