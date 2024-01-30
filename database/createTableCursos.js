import {sql} from './db.js'

sql`
    create table tb_cursos(
        cd_curso text,
        nm_curso varchar(45) not null,
        constraint pk_cursos primary key(cd_curso)
    );
`.then(()=>{
    console.log("Tabela criada!");
})