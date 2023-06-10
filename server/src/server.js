const http = require('http')
const app = require('./app')


const PORT = process.env.PORT || 3011 
const {loadPlanetData}= require('./model/planets.model')

const server = http.createServer(app)


async function startServer()
{
    await loadPlanetData()
    server.listen(PORT , ()=> {
        console.log(`Listening on port ${PORT}.......`)
    })
}
 
startServer()