const { OAuth2Client } = require("google-auth-library");
const FB = require("fb");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Form = require("../models/Form");
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
      const token = jwt.sign(
        {
          email: existing_user.email,
        },
        "secretKey",
        {
          expiresIn: "30d",
        }
      );
      res.status(201).json({
        success: true,
        token,
      });
    } else {
      const user = new User({
        username: payload["name"],
        email: payload["email"],
      });
      const saved_user = await user.save();
      if (saved_user) {
        const token = jwt.sign(
          {
            email: saved_user.email,
          },
          "secretKey",
          {
            expiresIn: "30d",
          }
        );
        res.status(201).json({
          success: true,
          token,
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
    const token = jwt.sign(
      {
        email: existing_user.email,
      },
      "secretKey",
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({
      success: true,
      token,
    });
  } else {
    const user = new User({
      username: resFacebook["name"],
      email: resFacebook["email"],
    });
    const saved_user = await user.save();
    if (saved_user) {
      const token = jwt.sign(
        {
          email: saved_user.email,
        },
        "secretKey",
        {
          expiresIn: "30d",
        }
      );
      res.status(201).json({
        success: true,
        token,
      });
    }
  }
};

const form = async (req, res) => {
  const { gender, day, hobby, sport } = req.body;
  const formInstance = new Form({
    day,
    gender,
    hobby,
    sport,
  });
};

module.exports = {
  google,
  facebook,
  form,
};
