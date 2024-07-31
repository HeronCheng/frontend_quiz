export default defineEventHandler(async event => {
  const body = await readBody(event);
  const { code } = body;
  if (code === 1234) {
    return {
        "valid": true,
        "token": "valid token"
    }
  } else {
    return {
        "valid": false
    }
  }
});