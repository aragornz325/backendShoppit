require('dotenv').config();

const config = {
  urlPushNotification: process.env.URL_PUSH_NOTIFICATION,
  tokenPushNotification: process.env.TOKEN_PUSH_NOTIFICACION,
  email: process.env.EMAIL,
  passEmail: process.env.PASSWORDEMAIL,
  userEmail: process.env.USEREMAIL,
  tokenMP: process.env.ACCESS_TOKEN_MP,
  apiKeyShoppit: process.env.APIKEYSHOPPIT,
  secretJWT: process.env.AUTH_JWT_SECRET,
  urlConsult: process.env.URL_CONSULTA_MP,
  tokenConsult: process.env.TOKEN_CONSULTA_MP,
  urlConsultaPagos: process.env.URL_CONSULTA_PAGO_MP,
  backUrlMp: process.env.BACK_URL,
  apiWeb: process.env.API_WEB_FIREBASE,
  algoliaApiSearch: process.env.ALGOLIA_API_SEARCH,
  algoliaAppId: process.env.ALGOLIA_APP_ID,
  algoliaUsersIndexName: process.env.ALGOLIA_USER_INDEX_NAME,
};

module.exports = { config };
