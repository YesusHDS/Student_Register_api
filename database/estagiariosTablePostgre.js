import {sql} from './db.js'

export class estagiariosTablePostgre{

    async create(estagiario){
        const {
            cd_curso, 
            cd_registroMatricula, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, 
            nm_estagiario
        } = estagiario

        await sql`
            insert into tb_estagiarios 
            (cd_curso, cd_registroMatricula, dt_periodoComeco, 
                dt_periodoTermino, nm_empresa, nm_estagiario) values
                (${cd_curso}, ${cd_registroMatricula}, 
                    ${dt_periodoComeco}, ${dt_periodoTermino}, 
                    ${nm_empresa}, ${nm_estagiario})
        `
    }

    async list(search='', empresa='', RA='', curso=''){
        let estagiarios = await sql`
            select e.cd_curso, cd_registroMatricula, dt_periodoComeco, dt_periodoTermino, nm_empresa, nm_estagiario from tb_estagiarios e
                left join tb_cursos c on e.cd_curso = c.cd_curso
                where nm_estagiario ilike ${'%'+search+'%'} 
                and nm_empresa ilike ${'%'+empresa+'%'}
                and cd_registroMatricula ilike ${'%'+RA+'%'}
                and c.cd_curso ilike ${'%'+curso+'%'}
        `

        return estagiarios
    }

    async update(id, estagiario){

        const {
            cd_curso, 
            dt_periodoComeco, 
            dt_periodoTermino, 
            nm_empresa, 
            nm_estagiario
        } = estagiario

        await sql`
            update tb_estagiarios 
                set cd_curso = ${cd_curso}, dt_periodoComeco = ${dt_periodoComeco}, dt_periodoTermino = ${dt_periodoTermino},
                    nm_empresa = ${nm_empresa}, nm_estagiario = ${nm_estagiario}
                    where cd_registroMatricula = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_estagiarios where cd_registroMatricula=${id}
        `
    }

}