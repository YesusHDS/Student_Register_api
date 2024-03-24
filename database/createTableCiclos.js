import {sql} from './db.js'

sql`
    create table tb_ciclos(
        cd_ciclo text,
        cd_curso text,
        nm_ciclo varchar(10),
        constraint pk_ciclos primary key(cd_ciclo),
        constraint fk_curso_ciclo foreign key(cd_curso)
            references tb_cursos on delete cascade
    );
`.then(()=>{
    console.log("Tabela criada!");
})