import { MongoClient } from "mongodb";
const globalAny: any = global;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
globalAny.mongo = globalAny.mongo || {};

let indexesCreated = false;
export async function createIndexes(db: any) {
  await Promise.all([
    db
      .collection("tokens")
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection("posts").createIndex({ createdAt: -1 }),
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}

export default async function database(req: any, res: any, next: () => void) {
  if (!globalAny.mongo.client) {
    globalAny.mongo.client = new MongoClient(process.env["MONGODB_URI"]!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await globalAny.mongo.client.connect();
  }
  req.dbClient = globalAny.mongo.client;
  req.db = globalAny.mongo.client.db(process.env.DB_NAME);
  if (!indexesCreated) await createIndexes(req.db);
  res;
  return next();
}
