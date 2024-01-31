import {loginRoute} from './loginRoute.js'
import {cursosRoute} from './cursosRoute.js'
import {estagiariosRoute} from './estagiariosRoute.js'

const fastifyCors = require("@fastify/cors")

export const routes = async (server)=>{
    server.register(loginRoute)
    server.register(cursosRoute)
    server.register(estagiariosRoute)
    server.register(fastifyCors,{
        origin:'*',
        allowedHeaders:[
            "Origin",
            "X-Requested-With",
            "Accept",
            "Content-Type",
            "Authorization",
        ],
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    })
}