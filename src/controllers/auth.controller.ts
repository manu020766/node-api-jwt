import { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken' 

export const signup = async (req:Request, res:Response) =>  {
    const { username, email, password } = req.body

    const user:IUser = new User({
        username,
        email,
        password
    })
    user.password = await user.encryptPassword(user.password)
    const newUser = await user.save()

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET || 'token secret key')

    res.header('auth-token', token).json(newUser)
    // res.status(200).json({
    //     newUser,
    //     token
    // })
}

export const signin = (req:Request, res:Response) =>  {
    res.status(200).json({ message: 'signin'})
}
export const profile = (req:Request, res:Response) =>  {
    res.status(200).json({ message: 'profile'})
}

