const express = require('express')
const {
    httpGetAllaunches,
    htttpAddNewLaunch,
    httpAbortLaunch,
}= require('./launches.controller')

const launchesRouter=express.Router()

launchesRouter.get('/' , httpGetAllaunches)
launchesRouter.post('/' , htttpAddNewLaunch)
launchesRouter.delete('/:id' , httpAbortLaunch)

module.exports=launchesRouter