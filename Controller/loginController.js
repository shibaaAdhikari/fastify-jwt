import bcrypt from "bcrypt";
import jwt from "@fastify/jwt";

const getLogins = async (req, reply) => {
  try {
    const login = await req.server.login.findAll();
    reply.send(login);
  } catch (error) {
    reply.send(error);
  }
};

const getUserById = async (req, reply) => {
  try {
    const user = await req.server.login.findByPk(req.params.id);
    reply.code(200).send(user);
  } catch (error) {
    throw error;
  }
};

const postLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      reply.code(400).send("All input is required");
    }

    const login = req.server.login;
    const oldUser = await login.findOne({ where: { email } });

    if (oldUser) {
      return reply.code(409).send("User Already Exists. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await login.create({ email, password: encryptedPassword });

    // Generate a JWT token
    const token = req.server.jwt.sign({ id: newUser.id });

    reply.status(201).send({ msg: "Sign up successful", token });
  } catch (error) {
    reply.send(error);
  }
};

export { getLogins, getUserById, postLogin };
