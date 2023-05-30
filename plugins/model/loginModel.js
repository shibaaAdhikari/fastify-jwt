import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export const myPlugin = async (fastify, opts, done) => {
  const login = fastify.sequelize.define("login", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  try {
    await login.sync({ force: false });
    console.log("User created successfully");
  } catch (error) {
    console.error(error);
  }

  fastify.decorate("login", login);
  done();
};

export default fp(myPlugin);
