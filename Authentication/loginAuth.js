import { Jwt } from "jsonwebtoken";
import { compare } from "bcrypt";
import { getUserById } from "../Controller/loginController";

async function authenticateAndGenerateToken(email, password) {
  try {
    const user = await getUserById(email);
    if (!user || !(await compare(password, user.password))) {
      return null;
    }
    const token = jwt.sign({ id: user.id }, "token-key");

    return token;
  } catch (error) {
    throw error;
  }
}

export default authenticateAndGenerateToken;
