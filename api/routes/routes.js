import {loginRoute} from './loginRoute.js'
import {cursosRoute} from './cursosRoute.js'
import {estagiariosRoute} from './estagiariosRoute.js'

export const routes = async (server)=>{
    server.register(loginRoute)
    server.register(cursosRoute)
    server.register(estagiariosRoute)
}