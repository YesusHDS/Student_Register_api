import {sql} from './db.js'

sql`
    create table login_curso(
        cd_login text references login on delete cascade,
        cd_curso text references cursos on delete cascade,
        primary key(cd_login, cd_curso)
    );
`.then(()=>{
    console.log("Tabela criada!");
}).catch(e => {
    console.log(e)
})