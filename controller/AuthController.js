const AuthModel = require("../model/AuthModel");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    let data = await AuthModel.create({ email, password, username });
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await AuthModel.findOne({ email, password });
    if (data === null) {
      res.status(200).json(`email atau passwod salah`);
    }
    let accessToken = jwt.sign(
      { email: data.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", accessToken, {
      path: "/",
      httpOnly: true, //accessible only by web server
      secure: false, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.send({ accessToken });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const Logout = (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared." });
  } catch (err) {
    res.status(400).json({ message: "Bad request." });
  }
};

module.exports = { Register, Login, Logout };
