import {sql} from './db.js'

sql`
    create table tb_turnos(
        cd_turno text,
        cd_curso text,
        nm_turno varchar(10),
        constraint pk_turnos primary key(cd_turno),
        constraint fk_curso_turno foreign key(cd_curso)
            references tb_cursos on delete cascade
    );
`.then(()=>{
    console.log("Tabela criada!");
})