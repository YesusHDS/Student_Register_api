import {sql} from './db.js'

sql`
    create table login(
        cd_login text primary key,
        cd_token text,
        nm_login varchar(45) not null,
        cd_senha varchar(45) not null,
        nm_tipo varchar(10) not null
    );
`.then(()=>{
    console.log("Tabela criada!");
})