import { Request, Response } from 'express'

export const signup = (req:Request, res:Response) =>  {
    res.status(200).json({ message: 'singup'})
}
export const signin = (req:Request, res:Response) =>  {
    res.status(200).json({ message: 'signin'})
}
export const profile = (req:Request, res:Response) =>  {
    res.status(200).json({ message: 'profile'})
}

