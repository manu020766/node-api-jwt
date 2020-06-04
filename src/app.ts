import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth'

const app:Application = express()

//settings
app.set('port', process.env.PORT || 3000)

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/api/auth',authRoutes)




export default app
