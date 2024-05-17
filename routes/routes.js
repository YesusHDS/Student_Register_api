import {loginRoute} from './loginRoute.js'
import {cursosRoute} from './cursosRoute.js'
import {estagiariosRoute} from './estagiariosRoute.js'
import {ciclosRoute} from './ciclosRoute.js'
import {empresasRoute} from './empresasRoute.js'
import {turnosRoute} from './turnosRoute.js'

export const routes = async (server)=>{
    server.register(loginRoute)
    server.register(cursosRoute)
    server.register(estagiariosRoute)
    server.register(ciclosRoute)
    server.register(turnosRoute)
    server.register(empresasRoute)
}