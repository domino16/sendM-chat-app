export interface User{
    email:string
    password?:string
    firstName:string
    lastName:string
    avatarImg?:string
    iat?: number
    exp?: number
}
