// import { createServer } from "node:http"

// const server = createServer((req, res)=>{
//     res.write("Olá mundo!")

//     res.end()
// })

// server.listen(3333)

import {fastify} from 'fastify'
import {routes} from './routes/routes.js'



const server = fastify()

routes(server)

server.listen({
    port: process.env.PORT ?? 3333
})