import {sql} from './db.js'

sql`
    create table cursos(
        cd_curso text primary key,
        nm_curso varchar(45) not null
    );
`.then(()=>{
    console.log("Tabela criada!");
})