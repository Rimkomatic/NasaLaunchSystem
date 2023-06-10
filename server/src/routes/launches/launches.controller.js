const {
    getAlllaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../model/launches.model')

function httpGetAllaunches(req,res)
{
    return res.status(200).json(getAlllaunches())
}

function htttpAddNewLaunch(req,res)
{
    const launch = req.body
    console.log(launch)
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Invalid data sent!!"
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
    return res.status(400).json({
        error: 'Invalid launch date',
    })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)
}


function httpAbortLaunch(req,res)
{
    const launchId= Number(req.params.id)

    if(existsLaunchWithId(launchId))
    {
        const aborted = abortLaunchById(launchId)

        return res.status(200).json(aborted)
    }
    else
    {
        return res.status(404).json({
            error: "The mission launch id not found!!!!!"
        })
    }
}

module.exports={
    httpGetAllaunches,
    htttpAddNewLaunch,
    httpAbortLaunch
}