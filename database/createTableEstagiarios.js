import {sql} from './db.js'

sql`
    create table tb_estagiarios(
        cd_registroMatricula text not null,
        cd_curso text,
        nm_statusMatricula varchar(20) not null,
        nm_turno varchar(10),
        nm_ciclo varchar(10) not null,
        dt_inicioEstagio date,
        qt_horaEstagioEntrada int,
        qt_horasEstagio int,
        nm_estagiario varchar(45) not null,
        cd_empresa text,
        dt_periodoComeco date not null,
        dt_periodoTermino date not null,
        constraint pk_estagiario primary key(cd_registroMatricula),
        constraint fk_curso_estagiario foreign key(cd_curso)
            references tb_cursos on delete cascade,
        constraint fk_empresa_estagiario foreign key(cd_empresa)
            references tb_empresas on delete cascade
    );
`.then(()=>{
    console.log("Tabela criada!");
})