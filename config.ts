const TOKEN: string = 'YOUR-TOKEN';
const CLIENT_ID: string = 'YOUR-CLIENT-ID'
if (!TOKEN || !CLIENT_ID) {
  throw new Error('MISSING TOKEN AND CLIENT ID');
}

export const config = {
  TOKEN,
  CLIENT_ID,
};
