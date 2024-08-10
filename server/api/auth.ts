export default defineEventHandler(async event => {
  const authorization = getHeader(event, 'authorization');

  if (authorization === 'xxyyzz') {
    return {
      "username": "John Doe",
      "quote": "I'm king of the world",
      "photo": 'https://img.icons8.com/face'
    }
  } else if (authorization === 'zzyyxx') {
    return {
      "username": "Doe John",
      "quote": "Hello, World!",
      "photo": 'https://img.icons8.com/girl'
    }
  } else {
    return {
      "message": "unauthorized"
    }
  }
});