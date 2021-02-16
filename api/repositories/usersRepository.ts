import { nanoid } from "nanoid";

export async function findUserById(db: any, userId: any) {
  return db
    .collection("users")
    .findOne({
      _id: userId,
    })
    .then((user: any) => user || null);
}

export async function findUserByEmail(db: any, email: any) {
  return db
    .collection("users")
    .findOne({
      email,
    })
    .then((user: any) => user || null);
}

export async function updateUserById(db: any, id: any, update: any) {
  return db
    .collection("users")
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false })
    .then(({ value }: { value: any }) => value);
}

export async function insertUser(
  db: any,
  { email = "", password = "", bio = "", name = "", profilePicture = "" }
) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      emailVerified: false,
      profilePicture,
      email,
      password,
      name,
      bio,
    })
    .then(({ ops }: { ops: any }) => ops[0]);
}
