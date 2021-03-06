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
    // res.status(200).json({ newUser, token })
}

export const signin = async (req:Request, res:Response) =>  {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'email y/o password están equivocados' })

    if (user.validatePassword(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'token secret key', {
            expiresIn: 60 * 60 * 12 // expira en 12 horas
        })

        user.password = '😎' // ctrl + i
        res.header('auth-token', token).status(200).json(user)
        // res.header('X-Powered-By', 'devuelve el nombre de la plataforma server').status(200).json({ user, token })
    }

    res.status(400).json({ message: 'email y/o password están equivocados' })
}
export const profile = async (req:Request, res:Response) =>  {
    const user = await User.findById(req.userId, { password:0 })

    if (!user) return res.status(404).json({ message: 'No existe el usuario' })
  
    res.status(200).json(user)
}

//express express-validator o @hapi/joi para hacer validadciones de los datos de entrada

