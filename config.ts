const TOKEN: string = 'MTIwNTY4OTg5OTYyNjI2NjY0NA.GN0QSE.24odA89Po609uRL6hQ1JN9g5ObGfWWtu1hyk50';
const CLIENT_ID: string = '1205689899626266644'
if (!TOKEN || !CLIENT_ID) {
  throw new Error('MISSING TOKEN AND CLIENT ID');
}

export const config = {
  TOKEN,
  CLIENT_ID,
};
