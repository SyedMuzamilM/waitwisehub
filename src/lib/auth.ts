import { sha256 } from "js-sha256";

export const hashToken = (
  token: string,
  {
    noSecret = false,
  }: {
    noSecret?: boolean;
  } = {}
) => {
  return sha256.hex(`${token}${noSecret ? "" : process.env.NEXTAUTH_SECRET}`);
};
