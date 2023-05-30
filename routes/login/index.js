import { getLogins, postLogin } from "../../Controller/loginController.js";

export default function (fastify, opts, done) {
  //   fastify.register(authenticationPlugin);
  const getLoginsOpts = {
    schema: {
      response: {},
    },
    onRequest: [fastify.authenticate],
    handler: getLogins,
  };

  const postLoginOpts = {
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
    },
    handler: postLogin,
  };

  fastify.get("/", getLoginsOpts);
  fastify.post("/", postLoginOpts);

  done();
}
