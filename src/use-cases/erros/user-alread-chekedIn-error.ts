export class UserAlreadyCheckedInError extends Error {
  constructor() {
    super('User already checked in today.')
   
  }
}