const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')


const MONGO_URL ="mongodb+srv://NASA_API:cbNTLCYw51B8Y0UV@nasacluster.fjuglz7.mongodb.net/nasa?retryWrites=true&w=majority"

const PORT = process.env.PORT || 3011 
const {loadPlanetData}= require('./model/planets.model')
const { error } = require('console')

const server = http.createServer(app)


mongoose. connection.once("open" , ()=>{
    console.log("Connection is ready")
})

mongoose.connection.on("error" , (err)=>{
    console.error(err)
})


async function startServer()
{
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        useUnifiedTopology: true
    })

    await loadPlanetData()
    server.listen(PORT , ()=> {
        console.log(`Listening on port ${PORT}.......`)
    })
}
 
startServer()