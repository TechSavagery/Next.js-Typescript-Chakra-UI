import { nanoid } from "nanoid";

export function findTokenByIdAndType(db: any, id: any, type: any) {
  return db.collection("tokens").findOne({
    _id: id,
    type,
  });
}

export function findAndDeleteTokenByIdAndType(db: any, id: any, type: any) {
  return db
    .collection("tokens")
    .findOneAndDelete({ _id: id, type })
    .then(({ value }: { value: any }) => value);
}

export function insertToken(db: any, { creatorId, type, expireAt }: any) {
  const securedTokenId = nanoid(32);
  return db
    .collection("tokens")
    .insertOne({
      _id: securedTokenId,
      creatorId,
      type,
      expireAt,
    })
    .then(({ ops }: { ops: any }) => ops[0]);
}
