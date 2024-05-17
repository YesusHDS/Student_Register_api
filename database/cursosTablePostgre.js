import {sql} from './db.js'
import {randomUUID} from 'node:crypto'

export class cursosTablePostgre{
    async list(search=''){
        let cursos = await sql`
            select cd_curso, nm_curso, nm_cicloEstagio from tb_cursos where nm_curso ilike ${'%'+search+'%'}
        `

        return cursos
    }

    async create(curso){
        const id = randomUUID()

        const {nm_curso, nm_cicloEstagio} = curso

        await sql`
            insert into tb_cursos (cd_curso, nm_curso, nm_cicloEstagio) values (${id}, ${nm_curso}, ${nm_cicloEstagio})
        `
    }

    async update(id, curso){
        const {nm_curso, nm_cicloEstagio} = curso

        await sql`
            update tb_cursos 
                set nm_curso = ${nm_curso}, nm_cicloEstagio = ${nm_cicloEstagio} where cd_curso = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_cursos where cd_curso = ${id}
        `
    }
}