export class UserAlreadyExistsErros extends Error {
    constructor (){
        super('E-mail already exists!')
    }
}