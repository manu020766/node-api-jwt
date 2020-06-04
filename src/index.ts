import app from './app'
import './database'

async function main() {
   await app.listen(app.get('port'), () => console.log('server listening in port ', app.get('port')))
}

main()
