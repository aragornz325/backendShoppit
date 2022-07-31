const path = require('path');

const swaggerEdit = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'shoppit API-REST',
      description: 'SHOPPIT SOLID architecture server',
      contact: {
        name: 'API Support',
        url: 'http://www.shoppit.com.ar/support',
        email: 'support@shoppit.com.ar',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://us-central1-ecommerce-mp.cloudfunctions.net/api',
        description: 'Production server',
      },
      {
        url: 'https://us-central1-shoppit-app-stg.cloudfunctions.net/api',
        description: 'Development server',
      },
    ],
  },
  apis: [`${path.join(__dirname, './*.js')}`],
};

module.exports = swaggerEdit;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   ApiKeySecurity:
 *     type: apiKey
 *     in: header
 *     name: api
 *   Token:
 *     name: Authorization
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 *
 *
 */

/**
 * @swagger
 * path:
 * /memberships:
 *  get:
 *   summary: Get all memberships
 *   description: Get all memberships
 *   operationId: getMemberships
 *   tags: [Memberships]
 *   parameters:
 *   - in: header
 *     name: x-user-id
 *     required: true
 *     example: "QbcLwTdVEoRuGejmVKIu"
 *     schema:
 *      type: string
 *      format: uuid
 *   security:
 *     - ApiKeySecurity []
 *     - Token []
 *   responses:
 *    '200':
 *     description: A list of memberships
 *     content:
 *      application/json:
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            example:
 *             active: true
 *             payment_url: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0LX91809WX099091"
 *             paymenc_cycle: "monthly"
 *             price: "10000"
 *             description: "Membership 1"
 *             name: "premium"
 *             memberships_discounts: [10.58, 25.50]
 *             created_at: "2020-04-01T00:00:00.000Z"
 *             membership_benefits: ["benefit 1", "benefit 2"]
 *             id: "Eo0gsPNyQho5edhNXdp8"
 *
 */

// get membership
/**
 * @swagger
 * path:
 * /memberships/{id}:
 *  get:
 *   summary: Get membership by id
 *   description: Get membership by id
 *   operationId: getMembershipById
 *   tags: [Memberships]
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     example: "Eo0gsPNyQho5edhNXdp8"
 *   - in: header
 *     name: x-user-id
 *     required: true
 *     example: "QbcLwTdVEoRuGejmVKIu"
 *     schema:
 *      type: string
 *      format: uuid
 *   security:
 *     - ApiKeySecurity []
 *     - Token []
 *   responses:
 *    '200':
 *     description: a description of membership
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *            active: true
 *            payment_url: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0LX91809WX099091"
 *            paymenc_cycle: "monthly"
 *            price: "10000"
 *            description: "Membership 1"
 *            name: "premium"
 *            memberships_discounts: [10.58, 25.50]
 *            created_at: "2020-04-01T00:00:00.000Z"
 *            membership_benefits: ["benefit 1", "benefit 2"]
 *            id: "Eo0gsPNyQho5edhNXdp8"
 *    '422':
 *     description: Unprocessable Entity
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *            statusCode: 422
 *            error: "Unprocessable Entity"
 *            message: "membership with ID xxxxxxxxxxxxxxxxx not found"
 *
 *
 */

// create membership
/**
 * @swagger
 * path:
 * /memberships:
 *  post:
 *   summary: Create membership
 *   description: Create membership
 *   operationId: createMembership
 *   tags: [Memberships]
 *   parameters:
 *   - in: header
 *     name: x-user-id
 *     required: true
 *     example: "QbcLwTdVEoRuGejmVKIu"
 *     schema:
 *      type: string
 *      format: uuid
 *   security:
 *     - ApiKeySecurity []
 *     - Token []
 *   requestBody:
 *     description: Membership object
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *            active: true
 *            payment_url: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0LX91809WX099091"
 *            paymenc_cycle: "monthly"
 *            price: "10000"
 *            description: "Membership 1"
 *            name: "premium"
 *            memberships_discounts: [10.58, 25.50]
 *            created_at: "2020-04-01T00:00:00.000Z"
 *            membership_benefits: ["benefit 1", "benefit 2"]
 *            id: "Eo0gsPNyQho5edhNXdp8"
 *   responses:
 *    '201':
 *     description: Membership created
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *            active: true
 *            payment_url: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0LX91809WX099091"
 *            paymenc_cycle: "monthly"
 *            price: "10000"
 *            description: "Membership 1"
 */

// update seller
/**
 * @swagger
 * path:
 * /users/{id}:
 *  patch:
 *    summary: actualiza los datos de un usuario
 *    tags: [Users]
 *    description: actualiza los datos del usuario, se verifica el body con DTO
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       format: uuid
 *       example: "QbcLwTdVEoRuGejmVKIu"
 *    - in: header
 *      name: x-user-id
 *      required: true
 *      schema:
 *        type: string
 *        format: uuid
 *        example: "QbcLwTdVEoRuGejmVKIu"
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *           $ref: '#/components/schemas/Users'
 *
 *    security:
 *     - Token: []
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: billing updated
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: ok
 *
 *
 *    401:
 *     description: "Error: Unauthorized"
 */

// set Seller
/**
 * @swagger
 * path:
 * /users/{id}/seller:
 *  put:
 *    summary: envio de formulario para setear en vendedor
 *    tags: [Users]
 *    description: completa el billing del objeto usuario con los datos obtenidos del formulario, se validan con DTO,
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       format: uuid
 *       example: "QbcLwTdVEoRuGejmVKIu"
 *    - in: header
 *      name: x-user-id
 *      required: true
 *      schema:
 *        type: string
 *        format: uuid
 *        example: "QbcLwTdVEoRuGejmVKIu"
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/UpdateSellerBilling'
 *
 *    security:
 *     - Token: []
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: billing updated
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: ok
 *
 *
 *    401:
 *     description: "Error: Unauthorized"
 */

// verify payment
/**
 * @swagger
 * path:
 * /users/{id}/verify-payment:
 *  post:
 *    summary: verifica el pago del vendedor
 *    tags: [Users]
 *    description: verifica el pago del vendedor en la API de mercado pago
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       format: uuid
 *       example: "QbcLwTdVEoRuGejmVKIu"
 *    - in: header
 *      name: x-user-id
 *      required: true
 *      schema:
 *        type: string
 *        format: uuid
 *        example: "QbcLwTdVEoRuGejmVKIu"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              pagoId:
 *                type: string
 *                example: "2c35awra43a843wa3w3f4w38"
 *    security:
 *     - Token: []
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: pay verificated successfully and update user customClaim
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: ok
 *
 *
 *    401:
 *     description: "Error: Unauthorized"
 */

// deactive user
/**
 * @swagger
 * path:
 * /users/{id}/deactivate:
 *  patch:
 *    summary: desactiva un usuario
 *    tags: [Users]
 *    description: desactiva un usuario impidiendo que pueda loguearse
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       format: uuid
 *       example: "QbcLwTdVEoRuGejmVKIu"
 *    - in: header
 *      name: x-user-id
 *      required: true
 *      schema:
 *        type: string
 *        format: uuid
 *        example: "QbcLwTdVEoRuGejmVKIu"
 *    security:
 *     - Token: []
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: user deactivated
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: ok
 *
 *
 *    401:
 *     description: "Error: Unauthorized"
 */

// active user
/**
 * @swagger
 * path:
 * /users/{id}/activate:
 *  patch:
 *    summary: activa un usuario
 *    tags: [Users]
 *    description: activa un usuario permitiendole loguearse
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       format: uuid
 *       example: "QbcLwTdVEoRuGejmVKIu"
 *    - in: header
 *      name: x-user-id
 *      required: true
 *      schema:
 *        type: string
 *        format: uuid
 *        example: "QbcLwTdVEoRuGejmVKIu"
 *    security:
 *     - Token: []
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: user actived
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: ok
 *
 *
 *    401:
 *     description: "Error: Unauthorized"
 */

// SCHEMAS
/**
 *  @swagger
 * components:
 *  schemas:
 *    Memberships:
 *      type: object
 *      properties:
 *        id:
 *         type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        membership_benefits:
 *          type: array
 *          items:
 *           type: string
 *        memberships_discounts:
 *          type: array
 *          items:
 *           type: number
 *        price:
 *          type: number
 *        payment_cycle:
 *          type: string
 *        active:
 *          type: boolean
 *        payment_url:
 *          type: string
 *      example:
 *        id: QbcLwTdVEoRuGejmVKIu
 *        name: "Basic"
 *        description: "Basic membership"
 *        price: 0
 *        payment_cycle: "monthly"
 *        active: true
 *        membership_benefits:
 *         - "Free shipping"
 *         - "Free returns"
 *         - "Free cancellation"
 *         - "Free upgrade"
 *        memberships_discounts:
 *         - 20
 *         - 30
 *    Users:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        billing:
 *          type: object
 *          properties:
 *          $ref: '#/components/schemas/UpdateSellerBilling'
 *        cookie:
 *          type: string
 *        id:
 *          type: string
 *          format: uuid
 *        identification:
 *          type: object
 *          properties:
 *            number:
 *              type: integer
 *              format: int64
 *            type:
 *              type: string
 *        isConsultor:
 *          type: boolean
 *        isSocial:
 *          type: boolean
 *        isVender:
 *          type: boolean
 *        loggedIn:
 *          type: boolean
 *        minimum_purchase:
 *          type: integer
 *        nicename:
 *          type: string
 *        picture:
 *          type: string
 *          format: url
 *        product_id_selected_from_web:
 *          type: string
 *        purchases:
 *          type: array
 *        recentProducts:
 *          type: array
 *        role:
 *          type: string
 *        sheetsId:
 *          type: string
 *        storeName:
 *          type: string
 *        storePicture:
 *          type: string
 *          format: url
 *        url:
 *          type: string
 *        username:
 *          type: string
 *        wishList:
 *          type: array
 *        password:
 *          type: string
 *    UpdateSellerBilling:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: email valido del usuario
 *          format: email
 *        firstName:
 *          type: string
 *          description: nombre del usuario
 *        lastName:
 *          type: string
 *          description: apellido del usuario
 *        cuil:
 *          type: integer
 *          description: identificacion numerica del usuario
 *        address:
 *          type: string
 *          description: direccion  postal del usuario
 *        city:
 *          type: string
 *          description: ciudad de residencia
 *        storeName:
 *          type: string
 *          description: Nombre de la tienda
 *        socialMedia:
 *          type: string
 *          description: Redes sociales
 *        website:
 *          type: string
 *          description: pagina web de la tienda
 *      required:
 *        - email
 *        - firstname
 *        - lastname
 *        - cuil
 *        - address
 *        - city
 *        - storeName
 *      example:
 *       #
 *       #
 *       email: "test@test.com"
 *       firstname: "juan"
 *       lastname: "Perez"
 *       cuil: 10200000004
 *       address: "calle falsa 123"
 *       city: "Cordoba"
 *       storename: "test S.A."
 *       socialMedia: "https://www.facebook.com/test"
 *       website: "https://www.test.com"
 * */
