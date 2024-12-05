import "dotenv/config";

export default {
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: "1d",
  },
};
