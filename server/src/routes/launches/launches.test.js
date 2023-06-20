const supertest = require('supertest')
const app = require('../../app')

describe('launches/GET',()=>{
    test('It should respond with 200 ' ,async ()=>{
        const responce=await supertest(app)
        .get('/launches')
        .expect('Content-Type' , /json/)
        .expect(200)     
    })
} )

describe('launches/POST' , ()=>{

    const completeLaunchData = {
        mission : 'Earth 2.0',
        rocket : 'ISE IS1',
        target: 'Kepler-186 f',
        launchDate : 'January 4,2028'
    }

    const launchDataWithOutDate = {
        mission : 'Earth 2.0',
        rocket : 'ISE IS1',
        target: 'Kepler-186 f',
    }

    const launchDataWithInvalidDate = {
        mission : 'Earth 2.0',
        rocket : 'ISE IS1',
        target: 'Kepler-186 f',
        launchDate : 'hello'
    }

    test('Is should respond with 201 ',async ()=>{
        const responce= await supertest(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type' , /json/)
        .expect(201)  

        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responceDate = new Date(responce.body.launchDate).valueOf()

        expect(responceDate).toBe(requestDate)

        expect(responce.body).toMatchObject(launchDataWithOutDate)
    })

    test('It should catch missing properties ',async ()=>{
        const responce = await supertest(app)
        .post('/launches')
        .send(launchDataWithOutDate)
        .expect('Content-Type' , /json/)
        .expect(400)

        expect(responce.body).toStrictEqual({
            error: "Invalid data sent!!"
        })
    })

    test('It should catch invalid dates ',async ()=>{
        const responce = await supertest(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type' , /json/)
        .expect(400)

        expect(responce.body).toStrictEqual({
            error: 'Invalid launch date',
        })
    })
})