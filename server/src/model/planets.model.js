const planets = require('./planets.mongo')

const {parse} = require('csv-parse')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')


function isHabitablePlanet(planet)
{
    return planet['koi_disposition'] === 'CONFIRMED' 
            && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 
            && planet['koi_prad']<1.6
}

// ../../data/kepler_data.csv'
function loadPlanetData()
{
    return new Promise((resolve , reject ) => { 
        fs.createReadStream(path.join(__dirname , '..' , '..' , 'data' , 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data',async (data)=>{
            if(isHabitablePlanet(data))
            {
                savePlanets(data)                
            }
        })
        .on('error',(err)=>{
            console.log(err)
            reject(err)
        })
        .on('end', async ()=>{
            const numOfPlanetsFound = (await getAllPlanets()).length
            console.log(`${numOfPlanetsFound} number of planets found`)
            resolve()
        })

     })
}

async function getAllPlanets()
{
    return await planets.find({} , {
        '__id':0 , '__v':0
    })
}

async function savePlanets(planet)
{
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name,
        },{
            keplerName: planet.kepler_name,
        },{
            upsert: true
        })
    }catch(err){
        console.error(`Could't save a planet ${err}`)
    }
}


module.exports ={
    loadPlanetData,
    getAllPlanets
}