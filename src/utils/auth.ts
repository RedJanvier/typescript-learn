import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signToken = ({
  data,
  secret,
  duration,
}: {
  data: object;
  secret: string;
  duration: string | number;
}): string => jwt.sign(data, secret, { expiresIn: duration });

export const verifyToken = ({
  token,
  secret,
}: {
  token: string;
  secret: jwt.Secret;
}) => {
  try {
    const data = jwt.verify(token, secret);
    return { ...(<any>data) };
  } catch (error) {
    console.log(`❌ Error in token verification: ${error.message}`.red.bold);
    return null;
  }
};

export const encryptPassword = async (password: string): Promise<any> =>
  await bcrypt.hash(password, 12);

export const decryptPassword = async (
  password: string,
  hash: string
): Promise<any> => await bcrypt.compare(password, hash);
