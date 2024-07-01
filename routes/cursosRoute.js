import {cursosTablePostgre} from '../database/cursosTablePostgre.js'

const curso = new cursosTablePostgre()

export const cursosRoute = async(server)=>{

    server.post('/curso', async(req,rep)=>{
        const {nm_curso, nm_cicloEstagio} = req.body

        const idCurso = await curso.create({
            nm_curso,
            nm_cicloEstagio
        })

        return idCurso
    })

    server.get('/curso',async (req)=>{
    
        const search = req.query.search
    
        const cursos = await curso.list(search)
    
        return cursos
    })

    server.put('/curso/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {nm_curso, nm_cicloEstagio} = req.body
    
        await curso.update(id, {
            nm_curso,
            nm_cicloEstagio
        })
    
        return rep.status(204).send()
    })

    server.delete('/curso/:id', async (req,rep)=>{
        const id = req.params.id
    
        await curso.delete(id)
    
        return rep.status(204).send()
    })
}