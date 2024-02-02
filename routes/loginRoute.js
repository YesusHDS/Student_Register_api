// import { loginTable } from './loginTable.js'
import { loginTablePostgre } from '../database/loginTablePostgre.js'

// const login = new loginTable()
const login = new loginTablePostgre()

export const loginRoute = async (server)=>{

    server.post('/create',async (req, rep)=>{

        const {nm_login, cd_senha,cd_curso} = req.body
    
        await login.create({
            nm_login,
            cd_senha,
            cd_curso
        })
    
        return rep.status(201).send()
    })

    server.post('/login', async(req, rep)=>{
        const {nm_login, cd_senha} = req.body


        const log = await login.login({
            nm_login,
            cd_senha
        })

        return rep.header('token', log.length>0?log[0].cd_token:'').send(req.body)
    })

    server.post('/sessionCheck', async(req, rep)=>{
        const {token} = req.body

        const check = login.check(token)

        return check
    })

    
    server.get('/loginList',async (req)=>{
    
        const {search, curso} = req.query
    
        const logins = await login.list(search, curso)
    
        return logins
    })
    
    server.put('/login/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {nm_login} = req.body
    
        await login.update(id, {
            nm_login,
        })
    
        return rep.status(204).send()
    })
    
    server.delete('/login/:id', async (req,rep)=>{
        const id = req.params.id
    
        await login.delete(id)
    
        return rep.status(204).send()
    })
}