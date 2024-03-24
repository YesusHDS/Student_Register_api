import {sql} from './db.js'

sql`
    create table tb_empresas(
        cd_empresa text not null,
        nm_empresa text,
        constraint pk_empresa primary key(cd_empresa)
    );
`.then(()=>{
    console.log("Tabela criada!");
})