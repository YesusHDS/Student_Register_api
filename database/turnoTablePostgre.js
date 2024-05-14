import {sql} from './db.js'
import {randomUUID} from 'node:crypto'

export class turnoTablePostgre{
    async list({search='', cd_curso=''}){
        let turnos = await sql`
            select cd_turno, cd_curso, nm_turno from tb_turnos where nm_turno ilike ${'%'+search+'%'}
                and cd_curso ilike ${'%'+cd_curso+'%'}
        `

        return turnos
    }

    async create(turno){
        const id = randomUUID()

        const {cd_curso, nm_turno} = turno

        await sql`
            insert into tb_turnos (cd_turno, cd_curso, nm_turno) values (${id}, ${cd_curso}, ${nm_turno})
        `
    }

    async update(id, turno){
        const {cd_curso, nm_turno} = turno

        await sql`
            update tb_turnos 
                set nm_turno = ${nm_turno}, cd_curso = ${cd_curso} where cd_turno = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_turnos where cd_turno = ${id}
        `
    }
}