import { Router, json } from 'express'
const app = Router()
import {  
    pushAccountObj, 
    validateUserPW,   
    updateBalance, 
    deleteAccount 
} from './middleware.js'

app.use(json())

app.post('/createAccount', pushAccountObj)

app.post('/login', validateUserPW)

app.patch('/updateBalance', updateBalance)

app.delete('/deleteAccount', deleteAccount)

export default app

    