import passport from "passport";
import passportLocal from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DatabaseUserAtributes, UserAtributes } from "../interface";

const prisma = new PrismaClient();
const LocalStrategy = passportLocal.Strategy;

/**
 * local strategy
 *
 * Sign in using Email and Password.
 */

//add the user to the req obj
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: DatabaseUserAtributes, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "mail", passwordField: "password" },
    async (username, password, done) => {
      try {
        //check user
        const databaseUser = await prisma.user.findUnique({
          where: { mail: username },
        });

        if (!databaseUser) {
          return done(null, false);
        }

        const validPassword = await bcrypt.compare(
          password,
          databaseUser.password
        );
        if (!validPassword) {
          return done(null, false);
        }
        //pass user data

        const userInfo: UserAtributes = {
          id: databaseUser.id,
          mail: databaseUser.mail,
          username: databaseUser.username,
        };

        return done(null, userInfo);
      } catch (error) {
        return done(error); //status 401
      }
    }
  )
);
