const { OAuth2Client } = require("google-auth-library");
const FB = require("fb");
const User = require("../models/User");
require("dotenv").config();

const google = async (req, res) => {
  const { tokenId } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (payload) {
    const existing_user = await User.findOne({
      email: payload["email"],
    });
    if (existing_user) {
      res.status(201).json({
        success: true,
      });
    } else {
      const user = new User({
        username: payload["name"],
        email: payload["email"],
      });
      const saved_user = await user.save();
      if (saved_user) {
        res.status(201).json({
          success: true,
        });
      }
    }
  }
};

const facebook = async (req, res) => {
  const { token } = req.body;
  FB.options({ appId: process.env.FACEBOOK_APP_ID, accessToken: token });
  const resFacebook = await FB.api("/me", { fields: ["id", "name", "email"] });
  if (!resFacebook || resFacebook.error) {
    console.log(resFacebook.error);
  }
  const existing_user = await User.findOne({
    email: resFacebook["email"],
  });
  if (existing_user) {
  } else {
    const user = new User({
      username: resFacebook["name"],
      email: resFacebook["email"],
    });
    const saved_user = await user.save();
    if (saved_user) {
      res.status(201).json({
        success: true,
      });
    }
  }
};

module.exports = {
  google,
  facebook,
};
