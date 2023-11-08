import { Router, json } from 'express'
const app = Router()
import {  
    pushAccountObj, 
    getAccountByEmail,   
    updateBalance, 
    deleteAccount 
} from './middleware.js'

app.use(json())

/**
 * @swagger
 * /api/createAccount:
 *   post:
 *     summary: Create Account Object with Email
 *     description: Authenticate Email & PW via Firebase & push to Mongo db
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       500:
 *         description: error has occured.
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *                 _id:
 *                   type: string
 */
app.post('/createAccount', pushAccountObj)

/**
 * @swagger
 * /api/getAccount:
 *   post:
 *     summary: Creating account via Google
 *     description: Authenticate via Firebase & push new account object to Mongo DB
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       500:
 *         description: error has occured.
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *                 _id:
 *                   type: string
 */
app.post('/getAccount', getAccountByEmail, pushAccountObj)

/**
 * @swagger
 * /api/updateBalance:
 *   post:
 *     summary: Handle withdrawals and deposits
 *     description: Authenticate via Firebase & push updates to account balances to Mongo db
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: string
 *             required:
 *               - amount
 *     responses:
 *       500:
 *         description: error has occured.
 *       200:
 *         description: Funds deposited/withdrawn successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *                 _id:
 *                   type: string
 */
app.patch('/updateBalance', updateBalance)


/**
 * @swagger
 * /api/getAccount:
 *   post:
 *     summary: Creating account via Google
 *     description: Authenticate via Firebase & push new account object to Mongo DB
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       500:
 *         description: error has occured.
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *                 _id:
 *                   type: string
 */
app.post('/getAccount', getAccountByEmail, pushAccountObj)

/**
 * @swagger
 * /api/deleteAccount:
 *   post:
 *     summary: User deleting their account
 *     description: Delete account data from Mongo DB and Firebase
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       500:
 *         description: error has occured.
 *       200:
 *         description: Account deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *                 _id:
 *                   type: string
 */
app.delete('/deleteAccount', deleteAccount)

export default app

    