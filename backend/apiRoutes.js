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
 *     summary: Get account object based on email (if one doesn't exist, add one)
 *     description: Authenticate via Firebase & push any new Google account objects to MongoDB
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
 *   patch:
 *     summary: Handle withdrawals and deposits
 *     description: Authenticate via Firebase & push updates to account balances & history to MongoDB
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
 * /api/deleteAccount:
 *   delete:
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

    