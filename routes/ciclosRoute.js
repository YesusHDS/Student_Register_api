import {ciclosTablePostgre} from '../database/ciclosTablePostgre.js'

const ciclo = new ciclosTablePostgre()

export const ciclosRoute = async(server)=>{

    server.post('/ciclo', async(req,rep)=>{
        const {cd_curso, nm_ciclo} = req.body

        await ciclo.create({
            cd_curso, 
            nm_ciclo
        })

        return rep.status(201).send()
    })

    server.get('/ciclo',async (req)=>{
    
        const {search, cd_curso} = req.query
    
        const ciclos = await ciclo.list({search, cd_curso})
    
        return ciclos
    })

    server.put('/ciclo/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {cd_curso, nm_ciclo} = req.body
    
        await ciclo.update(id, {
            cd_curso, 
            nm_ciclo
        })
    
        return rep.status(204).send()
    })

    server.delete('/ciclo/:id', async (req,rep)=>{
        const id = req.params.id
    
        await ciclo.delete(id)
    
        return rep.status(204).send()
    })
}