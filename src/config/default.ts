import "dotenv/config";

const configs = {
  port: process.env.PORT!,
  jwtSecret: process.env.JWT_SECRET!,
};

export default configs;
