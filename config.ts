const TOKEN: string = "MTE5MzczNTk4NTE2NzYwNTgzMQ.GlKRPK.kGJNtuHdSg4_r5X9WDYrPNzpWQe6rg49sVI_P4";
const CLIENT_ID: string = "1193735985167605831"
if (!TOKEN || !CLIENT_ID) {
  throw new Error("MISSING TOKEN AND CLIENT ID");
}

export const config = {
  TOKEN,
  CLIENT_ID,
};