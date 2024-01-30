import {sql} from './db.js'

sql`
    create table tb_estagiarios(
        cd_registroMatricula text not null,
        cd_curso text,
        nm_estagiario varchar(45) not null,
        nm_empresa varchar(45) not null,
        dt_periodoComeco date not null,
        dt_periodoTermino date not null,
        constraint pk_estagiario primary key(cd_registroMatricula),
        constraint fk_curso_estagiario foreign key(cd_curso)
            references tb_cursos on delete cascade
    );
`.then(()=>{
    console.log("Tabela criada!");
})