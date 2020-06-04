import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Database is connected'))
    .catch( err => console.log('Database is not connected error: ', err))
