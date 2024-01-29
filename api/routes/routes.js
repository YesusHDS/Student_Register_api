import {loginRoute} from './loginRoute.js'

export const routes = async (server)=>{
    server.register(loginRoute)
}