const TOKEN: string = '';
const CLIENT_ID: string = ''
if (!TOKEN || !CLIENT_ID) {
  throw new Error('MISSING TOKEN AND CLIENT ID');
}

export const config = {
  TOKEN,
  CLIENT_ID,
};
