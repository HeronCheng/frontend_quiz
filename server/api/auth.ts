export default defineEventHandler(async event => {
  const authorization = getHeader(event, 'authorization');

  if (authorization === 'xxyyzz') {
    return {
      "username": "John Doe",
      "quote": "I'm king of the world",
      "photo": '_nuxt/public/madness.png'
    }
  } else if (authorization === 'zzyyxx') {
    return {
      "username": "Doe John",
      "quote": "Hello, World!",
      "photo": '_nuxt/public/cool.png'
    }
  } else {
    return {
      "message": "unauthorized"
    }
  }
});