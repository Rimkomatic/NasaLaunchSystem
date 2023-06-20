const {
    getAllaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../model/launches.model')

async function httpGetAllaunches(req,res)
{
    return res.status(200).json(await getAllaunches())
}

async function htttpAddNewLaunch(req,res)
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
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}


async function httpAbortLaunch(req,res)
{
    const launchId= Number(req.params.id)

    if(await existsLaunchWithId(launchId))
    {
        const aborted = await abortLaunchById(launchId)

        if(!aborted)
        {
            return res.status(400).json({
                error: "Something unexpected happend while aborting"
            })
        }

        return res.status(200).json({
            ok : true
        })
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