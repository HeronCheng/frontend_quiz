export default defineEventHandler(async event => {
  const body = await readBody(event);
  const { code } = body;
  if (code === 1234) {
    return {
        "valid": true,
        "token": "xxyyzz"
    }
  } else if (code === 4321) {
    return {
        "valid": true,
        "token": "zzyyxx"
    }
  }
  else {
    return {
        "valid": false
    }
  }
});