import {estagiariosTablePostgre} from '../database/estagiariosTablePostgre.js'

const estagiario = new estagiariosTablePostgre()

export const estagiariosRoute = async(server)=>{

    server.post('/estagiario', async(req,rep)=>{
        const {
            cd_curso, 
            cd_registroMatricula, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, 
            nm_estagiario
        } = req.body

        await estagiario.create({
            cd_curso, 
            cd_registroMatricula, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, 
            nm_estagiario
        })

        return rep.status(201).send()
    })

    server.get('/estagiario',async (req)=>{
    
        const {search, empresa, RA, curso} = req.query
    
        const estagiarios = await estagiario.list(search, empresa, RA, curso)
    
        return estagiarios
    })

    server.put('/estagiario/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {
            cd_curso, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, nm_estagiario} = req.body
    
        await estagiario.update(id, {
            cd_curso, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, nm_estagiario
        })
    
        return rep.status(204).send()
    })

    server.delete('/estagiario/:id', async (req,rep)=>{
        const id = req.params.id
    
        await estagiario.delete(id)
    
        return rep.status(204).send()
    })
}