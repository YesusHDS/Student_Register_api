import {sql} from './db.js'

export class estagiariosTablePostgre{

    async create(estagiario){
        const {
            cd_curso, 
            cd_registroMatricula, 
            nm_statusMatricula,
            nm_turno,
            nm_ciclo,
            dt_inicioEstagio,
            qt_horaEstagioEntrada,
            qt_horasEstagio,
            cd_empresa,
            ic_check,
            nm_estagiario
        } = estagiario

        await sql`
            insert into tb_estagiarios 
            (cd_curso, cd_registroMatricula, nm_estagiario, nm_statusMatricula, nm_turno, nm_ciclo, dt_inicioEstagio, qt_horaEstagioEntrada, qt_horasEstagio, cd_empresa, ic_check) values
                (${cd_curso}, ${cd_registroMatricula}, ${nm_estagiario}, ${nm_statusMatricula}, ${nm_turno}, ${nm_ciclo}, ${dt_inicioEstagio}, ${qt_horaEstagioEntrada}, ${qt_horasEstagio}, ${cd_empresa}, ${ic_check})
        `
    }

    async list(search='', empresa='', RA='', curso='', statusMatricula='', check=''){

        var estagiarios

        if(check=='1'){
            estagiarios = await sql`
                select e.cd_curso, cd_registroMatricula, e.cd_empresa, em.nm_empresa, nm_estagiario, e.nm_turno, e.nm_ciclo, e.dt_inicioEstagio, e.qt_horaEstagioEntrada, e.qt_horasEstagio, e.ic_check, e.nm_statusMatricula from tb_estagiarios e
                    left join tb_cursos c on e.cd_curso = c.cd_curso
                    left join tb_empresas em on e.cd_empresa = em.cd_empresa
                    where nm_estagiario ilike ${'%'+search+'%'} 
                    and em.nm_empresa ilike ${'%'+empresa+'%'}
                    and cd_registroMatricula ilike ${'%'+RA+'%'}
                    and c.cd_curso ilike ${'%'+curso+'%'}
                    and e.nm_statusMatricula ilike ${'%'+statusMatricula+'%'}
                    and e.ic_check = ${true}`
        } else if(check=='0'){
            estagiarios = await sql`
            select e.cd_curso, cd_registroMatricula, e.cd_empresa, em.nm_empresa, nm_estagiario, e.nm_turno, e.nm_ciclo, e.dt_inicioEstagio, e.qt_horaEstagioEntrada, e.qt_horasEstagio, e.ic_check, e.nm_statusMatricula from tb_estagiarios e
                left join tb_cursos c on e.cd_curso = c.cd_curso
                left join tb_empresas em on e.cd_empresa = em.cd_empresa
                where nm_estagiario ilike ${'%'+search+'%'} 
                and em.nm_empresa ilike ${'%'+empresa+'%'}
                and cd_registroMatricula ilike ${'%'+RA+'%'}
                and c.cd_curso ilike ${'%'+curso+'%'}
                and e.nm_statusMatricula ilike ${'%'+statusMatricula+'%'}
                and e.ic_check = ${false}
            `
        }else{
            estagiarios = await sql`
            select e.cd_curso, cd_registroMatricula, e.cd_empresa, em.nm_empresa, nm_estagiario, e.nm_turno, e.nm_ciclo, e.dt_inicioEstagio, e.qt_horaEstagioEntrada, e.qt_horasEstagio, e.ic_check, e.nm_statusMatricula from tb_estagiarios e
                left join tb_cursos c on e.cd_curso = c.cd_curso
                left join tb_empresas em on e.cd_empresa = em.cd_empresa
                where nm_estagiario ilike ${'%'+search+'%'} 
                and em.nm_empresa ilike ${'%'+empresa+'%'}
                and cd_registroMatricula ilike ${'%'+RA+'%'}
                and c.cd_curso ilike ${'%'+curso+'%'}
                and e.nm_statusMatricula ilike ${'%'+statusMatricula+'%'}
            `
        }

        return estagiarios
    }

    async update(id, estagiario){

        const {
            cd_curso,
            cd_empresa, 
            nm_estagiario,
            nm_statusMatricula,
            nm_turno,
            nm_ciclo,
            dt_inicioEstagio,
            qt_horaEstagioEntrada,
            qt_horasEstagio,
            ic_check
        } = estagiario

        await sql`
            update tb_estagiarios 
                set cd_curso = ${cd_curso},
                    nm_estagiario = ${nm_estagiario},
                    cd_empresa = ${cd_empresa},
                    nm_statusMatricula = ${nm_statusMatricula},
                    nm_turno = ${nm_turno},
                    nm_ciclo = ${nm_ciclo},
                    dt_inicioEstagio = ${dt_inicioEstagio},
                    qt_horaEstagioEntrada = ${qt_horaEstagioEntrada},
                    qt_horasEstagio = ${qt_horasEstagio},
                    ic_check = ${ic_check}
                    where cd_registroMatricula = ${id}
        `
    }

    async delete(id){
        await sql`
            delete from tb_estagiarios where cd_registroMatricula=${id}
        `
    }

}