// import { createServer } from "node:http"

// const server = createServer((req, res)=>{
//     res.write("Olá mundo!")

//     res.end()
// })

// server.listen(3333)

import {fastify} from 'fastify'
import {routes} from './routes/routes.js'
import {fastifyCors} from '@fastify/cors'

const server = fastify()

server.register(fastifyCors,{
    origin:'*',
    allowedHeaders:[
        "Origin",
        "X-Requested-With",
        "Accept",
        "Content-Type",
        "Authorization",
        "token",
        "Token",
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
})

routes(server)



server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})