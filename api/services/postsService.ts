import { getPosts, insertPost } from "../repositories/postsRepository";

export const getAllPosts = async (
  db: any,
  queryFrom: any,
  queryBy: any,
  queryLimit: any
) => {
  const posts = await getPosts(
    db,
    queryFrom ? new Date(queryFrom) : undefined,
    queryBy,
    queryLimit ? parseInt(queryLimit, 10) : queryLimit
  );
  return posts;
};

export const insertUserPost = async (
  db: any,
  content: any,
  creatorId: string
) => {
  const post = await insertPost(db, {
    content: content,
    creatorId: creatorId,
  });
  return post;
};
