import {sql} from './db.js'

sql`
    create table tb_login(
        cd_login text,
        cd_curso text,
        cd_token text,
        nm_login varchar(45) not null,
        cd_senha text not null,
        nm_tipo varchar(10) not null,
        constraint pk_login primary key(cd_login),
        constraint fk_curso_login foreign key(cd_curso)
            references tb_cursos(cd_curso) on delete cascade
    );
`.then(()=>{
    console.log("Tabela criada!");
})