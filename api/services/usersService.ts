import {
  findUserByEmail,
  findUserById,
  insertUser,
  updateUserById,
} from "../repositories/usersRepository";
import { v2 as cloudinary } from "cloudinary";
import {
  findAndDeleteTokenByIdAndType,
  insertToken,
} from "../repositories/tokenRepository";
import { sendMail } from "../repositories/emailRepository";

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env["CLOUDINARY_URL"]!);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const sensitiveFields = ["email", "emailVerified", "password"];
export function extractUser(user: any) {
  if (!user) return null;
  const obj: {
    [key: string]: number | string;
  } = {};
  Object.keys(user).forEach((key) => {
    if (!sensitiveFields.includes(key)) obj[key] = user[key];
  });
  return obj;
}

export const createUser = async (
  db: any,
  { email = "", password = "", bio = "", name = "", profilePicture = "" }
) => {
  //Check if user exists
  if (await findUserByEmail(db, email)) {
    ("The email has already been used.");
    return;
  }
  return insertUser(db, { email, password, bio, name, profilePicture });
};

export const updateUserInfo = async (
  db: any,
  userId: any,
  name: string,
  bio: string,
  file: any
) => {
  let profilePicture;
  if (file) {
    const image = await cloudinary.uploader.upload(file.path, {
      width: 512,
      height: 512,
      crop: "fill",
    });
    profilePicture = image.secure_url;
  }

  const user = await updateUserById(db, userId, {
    ...(name && { name }),
    ...(typeof bio === "string" && { bio }),
    ...(profilePicture && { profilePicture }),
  });
  return user;
};

export const getUserById = async (db: any, userId: any) => {
  const user = extractUser(await findUserById(db, userId));
  return user;
};

export const getUserByEmail = async (db: any, email: string) => {
  const user = await findUserByEmail(db, email);
  return user;
};

export const insertEmailVerificationToken = async (db: any, userId: any) => {
  const token = await insertToken(db, {
    creatorId: userId,
    type: "emailVerify",
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  return token;
};

export const insertResetPasswordToken = async (db: any, userId: any) => {
  await insertToken(db, {
    creatorId: userId,
    type: "passwordReset",
    expireAt: new Date(Date.now() + 1000 * 60 * 20),
  });
};

export const deletePasswordResetToken = async (db: any, token: any) => {
  const deletedToken = await findAndDeleteTokenByIdAndType(
    db,
    token,
    "passwordReset"
  );
  return deletedToken;
};

export async function sendEmailVerification(
  email: string,
  userName: string,
  token: any
) {
  const msg = {
    to: email,
    from: process.env["EMAIL_FROM"]!,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
        <div>
          <p>Hello, ${userName}</p>
          <p>Please follow <a href="${process.env.WEB_URI}verify-email/${token}">this link</a> to confirm your email.</p>
        </div>
        `,
  };
  sendMail(msg);
}

export async function sendResetPasswordEmail(
  email: string,
  userName: string,
  token: any
) {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "[nextjs-mongodb-app] Reset your password.",
    html: `
        <div>
          <p>Hello, ${userName}</p>
          <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token._id}">this link</a> to reset your password.</p>
        </div>
        `,
  };
  sendMail(msg);
}

export const updateUserPassword = async (
  db: any,
  userId: any,
  password: any
) => {
  await updateUserById(db, userId, { password });
};
