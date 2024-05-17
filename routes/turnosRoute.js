import {turnoTablePostgre} from '../database/turnoTablePostgre.js'

const turno = new turnoTablePostgre()

export const turnosRoute = async(server)=>{

    server.post('/turno', async(req,rep)=>{
        const {cd_curso, nm_turno} = req.body

        await turno.create({
            cd_curso, 
            nm_turno
        })

        return rep.status(201).send()
    })

    server.get('/turno',async (req)=>{
    
        const {search, curso} = req.query
    
        const turnos = await turno.list({search, cd_curso:curso})
    
        return turnos
    })

    server.put('/turno/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {cd_curso, nm_turno} = req.body
    
        await turno.update(id, {
            cd_curso, 
            nm_turno
        })
    
        return rep.status(204).send()
    })

    server.delete('/turno/:id', async (req,rep)=>{
        const id = req.params.id
    
        await turno.delete(id)
    
        return rep.status(204).send()
    })
}