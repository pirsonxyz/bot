const TOKEN: string = 'MTIwNTY4OTg5OTYyNjI2NjY0NA.GyF6AZ.A2-cG6rN4-b7ow1Yg5WAMFT-4hdLD1b3xAsJJ4';
const CLIENT_ID: string = '1205689899626266644'
if (!TOKEN || !CLIENT_ID) {
  throw new Error('MISSING TOKEN AND CLIENT ID');
}

export const config = {
  TOKEN,
  CLIENT_ID,
};
