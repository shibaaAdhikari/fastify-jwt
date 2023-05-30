import fastifyPlugin from "fastify-plugin";
import jwt from "@fastify/jwt";

const authenticationPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.register(jwt, {
    secret: process.env.SECRETE_KEY,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

export default authenticationPlugin;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjg1NDQzMjMxfQ.glYmVdIdAwnHu8GHes_btG_NdMBkcAAf8AXt3FjZcEk