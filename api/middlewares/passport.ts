import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserById, findUserByEmail } from "../repositories/usersRepository";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// passport#160
passport.deserializeUser((req: any, id: any, done: any) => {
  findUserById(req.db, id).then(
    (user: any) => done(null, user),
    (err: any) => done(err)
  );
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req: any, email, password, done) => {
      const user = await findUserByEmail(req.db, email);
      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user);
      else done(null, false, { message: "Email or password is incorrect" });
    }
  )
);

export default passport;
