import {empresasTablePostgre} from '../database/empresasTablePostgre.js'

const empresa = new empresasTablePostgre()

export const empresasRoute = async(server)=>{

    server.post('/empresa', async(req,rep)=>{
        const {nm_empresa} = req.body

        await empresa.create({
            nm_empresa
        })

        return rep.status(201).send()
    })

    server.get('/empresa',async (req)=>{
    
        const search = req.query.search
    
        const empresas = await empresa.list(search)
    
        return empresas
    })

    server.put('/empresa/:id', async (req, rep)=>{
        const id = req.params.id
    
        const {nm_empresa} = req.body
    
        await empresa.update(id, {
            nm_empresa
        })
    
        return rep.status(204).send()
    })

    server.delete('/empresa/:id', async (req,rep)=>{
        const id = req.params.id
    
        await empresa.delete(id)
    
        return rep.status(204).send()
    })
}