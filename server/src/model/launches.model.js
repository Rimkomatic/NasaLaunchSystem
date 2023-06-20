const launchesDB = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launches= new Map()
let latestLaunchedNumber = 100

const launch={
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate: new Date('December 27 , 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA' , 'SpaceX'],
    upcoming : true,
    success : true,
}

addNewLaunch(launch)

async function getAllaunches()
{
    return await launchesDB.find({},
        {
            '__id':0,
            '__v':0
        })
}

async function getLatestFlightnumber(){
    const lastLaunch=await launchesDB
    .findOne()
    .sort('-flightNumber')

    if(!lastLaunch)
    {
        return DEFAULT_FLIGHT_NUMBER
    }
    return lastLaunch.flightNumber
}

async function scheduleNewLaunch(launch)
{
    const newFlightNumber = await getLatestFlightnumber() + 1

    const newLaunch = Object.assign(launch , {
        customer: ['NASA' , 'SpaceX'],
        upcoming : true,
        success : true,
        flightNumber: newFlightNumber
    })

    await addNewLaunch(launch)
}


async function addNewLaunch(launch)
{
    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber
    },launch,{
        upsert: true
    })
}

async function existsLaunchWithId(launchId)
{
    return await launchesDB.findOne({
        flightNumber: launchId
    })
}

async function abortLaunchById(launchId)
{
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId
    },{
      upcoming: false,
      success : false
    })
    
    return aborted.modifiedCount === 1
} 
    
module.exports ={
    getAllaunches,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
}