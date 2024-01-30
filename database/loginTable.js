import { randomUUID } from 'node:crypto'

export class loginTable{
    #table = new Map()

    list(search){
        return Array.from(this.#table.entries()).map((loginArray)=>{
            const id = loginArray[0]

            const data = loginArray[1]

            return {
                id,
                ...data
            }
        }).filter(login => {
            if(search)
                return login.nm_login.includes(search)
            return true
        })
    }

    create(login){
        const id = randomUUID()

        this.#table.set(id, login)
    }

    update(id, login){
        this.#table.set(id,login)
    }

    delete(id){
        this.#table.delete(id)
    }
}