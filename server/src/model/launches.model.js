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

launches.set(launch.flightNumber , launch)

function getAlllaunches()
{
    return Array.from(launches.values())
}


function addNewLaunch(launch)
{
    latestLaunchedNumber++
    launches.set(
        latestLaunchedNumber,
        Object.assign(launch,{
            flightNumber : latestLaunchedNumber ,
            customer: ['NASA' , 'SpaceX'],
            upcoming : true,
            success : true,
        })
        )
}


function existsLaunchWithId(launchId)
{
    return launches.has(launchId)
}

function abortLaunchById(launchId)
{
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false

    return aborted
}
    
module.exports ={
    getAlllaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
}