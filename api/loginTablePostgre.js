import {sql} from './db.js'
import { randomUUID } from 'node:crypto'

// select * from login l left join login_curso lc on lc.cd_login = l.cd_login
// join cursos c on lc.cd_curso = c.cd_curso;

export class loginTablePostgre{
    #table = new Map()

    async list(search = '', course = ''){
        let logins = await sql`
            select l.cd_login, l.nm_login, l.nm_tipo from login l
                where l.nm_tipo = ${'professor'} 
                and l.nm_login ilike ${'%'+search+'%'}
             
        `

        return logins
    }

    async create(login){
        const id = randomUUID()

        const {nm_login, cd_senha} = login

        await sql`insert into login (cd_login, cd_senha, nm_login, nm_tipo) values (${id}, ${cd_senha}, ${nm_login}, 'professor');`
    }

    async update(id, login){
        const {nm_login, cd_senha} = login

        await sql`update login set nm_login = ${nm_login} where cd_login = ${id}`
    }

    async delete(id){
        await sql`delete from login where cd_login = ${id}`
    }
}