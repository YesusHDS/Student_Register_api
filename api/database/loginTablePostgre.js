import {sql} from './db.js'
import { randomUUID, createHash } from 'node:crypto'

// select * from login l left join login_curso lc on lc.cd_login = l.cd_login
// join cursos c on lc.cd_curso = c.cd_curso;

export class loginTablePostgre{
    #table = new Map()

    async list(search = '', course = ''){
        let logins = await sql`
            select l.cd_login, l.nm_login, l.nm_tipo from tb_login l
                where l.nm_tipo = ${'professor'} 
                and l.nm_login ilike ${'%'+search+'%'}
             
        `

        return logins
    }

    async create(login){
        const id = randomUUID()

        const {nm_login, cd_senha} = login

        const hashSenha = createHash('sha256').update(cd_senha).digest('hex')

        await sql`insert into tb_login (cd_login, cd_senha, nm_login, nm_tipo) values (${id}, ${hashSenha}, ${nm_login}, 'professor');`
    }

    async update(id, login){
        const {nm_login, cd_senha} = login

        await sql`update tb_login set nm_login = ${nm_login} where cd_login = ${id}`
    }

    async delete(id){
        await sql`delete from tb_login where cd_login = ${id}`
    }
}