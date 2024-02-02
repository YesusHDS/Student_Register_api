import {sql} from './db.js'
import { randomUUID, createHash } from 'node:crypto'

// select * from login l left join login_curso lc on lc.cd_login = l.cd_login
// join cursos c on lc.cd_curso = c.cd_curso;

export class loginTablePostgre{

    async login(login){
        const {nm_login, cd_senha} = login

        const hashSenha = createHash('sha256').update(cd_senha).digest('hex')
        const token = randomUUID()

        await sql`
            update tb_login set cd_token = ${token} where nm_login = ${nm_login} and cd_senha = ${hashSenha}
        `

        let log = await sql`
            select l.cd_login, l.nm_login, l.nm_tipo, c.cd_curso, c.nm_curso, l.cd_token from tb_login l left join tb_cursos c
            on l.cd_curso = c.cd_curso
            where cd_token = ${token}
        `

        return log
            
    }

    async check(token){

        let log = await sql`
            select l.cd_login, l.nm_login, l.nm_tipo, c.cd_curso, c.nm_curso, c.cd_token from tb_login l left join tb_cursos c
                on l.cd_curso = c.cd_curso
                where cd_token = ${token}
        `

        return log

    }

    async list(search = '', curso){

        let logins

        logins = await sql`
            select l.cd_login, l.nm_login, l.nm_tipo, c.cd_curso, c.nm_curso from tb_login l left join tb_cursos c
                on l.cd_curso = c.cd_curso
                where l.nm_login ilike ${'%'+search+'%'}
                and (l.cd_curso ilike ${'%'+curso+'%'})
            `

        return logins
    }

    async create(login){
        const id = randomUUID()

        const {nm_login, cd_senha, cd_curso} = login

        const hashSenha = createHash('sha256').update(cd_senha).digest('hex')

        await sql`
            insert into tb_login (cd_login, cd_senha, nm_login, nm_tipo, cd_curso) 
            values (${id}, ${hashSenha}, ${nm_login}, 'professor', ${cd_curso.length>0?cd_curso:null})
        `
    }

    async update(id, login){
        const {nm_login} = login

        await sql`update tb_login set nm_login = ${nm_login} where cd_login = ${id}`
    }

    async delete(id){
        await sql`delete from tb_login where cd_login = ${id}`
    }
}