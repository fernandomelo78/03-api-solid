export class UserAlrealdyExistsErros extends Error {
    constructor (){
        super('E-mail already exists!')
    }
}