import {sql} from './db.js'

sql`
    create table estagiarios(
        cd_registroMatricula text primary key,
        cd_curso text references cursos on delete cascade,
        nm_estagiario varchar(45) not null,
        nm_empresa varchar(45) not null,
        dt_periodoComeco date not null,
        dt_periodoTermino date not null
    );
`.then(()=>{
    console.log("Tabela criada!");
}).catch(e => {
    console.log(e)
})