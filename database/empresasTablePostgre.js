import {sql} from './db.js'
import {randomUUID} from 'node:crypto'

export class empresasTablePostgre{
    async list(search=''){
        let empresas = await sql`
            select cd_empresa, nm_empresa from tb_empresas where nm_empresa ilike ${'%'+search+'%'}
        `

        return empresas
    }

    async create(empresa){
        const id = randomUUID()

        const {nm_empresa} = empresa

        await sql`
            insert into tb_empresas (cd_empresa, nm_empresa) values (${id}, ${nm_empresa})
        `
    }

    async update(id, empresa){
        const {nm_empresa} = empresa

        await sql`
            update tb_empresas 
                set nm_empresa = ${nm_empresa} where cd_empresa = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_empresas where cd_empresa = ${id}
        `
    }
}