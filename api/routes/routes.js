import {loginRoute} from './loginRoute.js'
import {cursosRoute} from './cursosRoute.js'

export const routes = async (server)=>{
    server.register(loginRoute)
    server.register(cursosRoute)
}