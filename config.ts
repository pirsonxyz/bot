const TOKEN: string = "YOUR_TOKEN";
const CLIENT_ID: string = "YOUR_CLIENT_ID"
if (!TOKEN || !CLIENT_ID) {
  throw new Error("MISSING TOKEN AND CLIENT ID");
}

export const config = {
  TOKEN,
  CLIENT_ID,
};
