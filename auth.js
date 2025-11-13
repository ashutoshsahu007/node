import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Personn from "./models/Person.js";

// 5. Passport strategy setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log(`Received credentials: ${username}, ${password}`);
      const user = await Personn.findOne({ userName: username });
      if (!user) {
        console.log("incorrect username ");
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.passWord != password) {
        return done(null, false, { message: "Incorrect password." });
      }
      console.log("correct");
      return done(null, user);
    } catch (error) {
      console.error("Error during authentication:", error);
      return done(error);
    }
  })
);

export default passport;
