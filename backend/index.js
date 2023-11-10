import 'dotenv/config'
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './apiRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use("/", express.static(join(__dirname, '../frontend')))
app.use('/api', apiRoutes)

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MIT Bad Bank',
            version: '1.0.0',
            description: 'API documentation for my Express app'
        },
    },
    apis: [join(__dirname,`./apiRoutes.js`)]
}

const swaggerSpec = swaggerJSDoc(options)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(process.env.PORT || 3000, () => {
    console.log("RUNNING");
})
