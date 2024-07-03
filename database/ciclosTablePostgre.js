import {sql} from './db.js'
import {randomUUID} from 'node:crypto'

export class ciclosTablePostgre{
    async list({search='', cd_curso=''}){
        let ciclos = await sql`
            select cd_ciclo, cd_curso, nm_ciclo from tb_ciclos where nm_ciclo ilike ${'%'+search+'%'}
                and cd_curso ilike ${'%'+cd_curso+'%'}
        `

        return ciclos
    }

    async create(ciclo){
        const id = randomUUID()

        const {cd_curso, nm_ciclo} = ciclo

        await sql`
            insert into tb_ciclos (cd_ciclo, cd_curso, nm_ciclo) values (${id}, ${cd_curso}, ${nm_ciclo})
        `
    }

    async update(id, ciclo){
        const {cd_curso, nm_ciclo} = ciclo

        await sql`
            update tb_ciclos 
                set nm_ciclo = ${nm_ciclo}, cd_curso = ${cd_curso} where cd_ciclo = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_ciclos where cd_ciclo = ${id}
        `
    }
}