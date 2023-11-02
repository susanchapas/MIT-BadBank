import 'dotenv/config'
import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import apiRoutes from './apiRoutes.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use("/", express.static(join(__dirname, '../frontend')))
app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log("RUNNING");
})
