const {parse} = require('csv-parse')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')


const results=[]

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
        .on('data',(data)=>{
            if(isHabitablePlanet(data))
            {
                results.push(data)
            }
        })
        .on('error',(err)=>{
            console.log(err)
            reject(err)
        })
        .on('end',()=>{
            console.log(`${results.length} number of planets found`)
            resolve()
        })

     })
}

function getAllPlanets()
{
    return results
}


module.exports ={
    loadPlanetData,
    getAllPlanets
}