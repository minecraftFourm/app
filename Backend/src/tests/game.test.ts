import request from 'supertest'
import {app} from '../app'
import prisma from '../db/prisma.client'


describe('game test suite', ()=>{
    
    const userData = {
        id: "4a6de4ef-3f5e-46a0-b409-aa2cd2532509",
        password: "adminuser",
        email: 'admin@example.com',
        username: "admin"
    }

    const gameData1 = {
        title: "test",
        description: "test",
        previewImg: "test.png",
        tags: ["zxc", "asd"],
        statsLink: "zxczx"

    }

    const gameData2 = {
        title: "test2",
        description: "test2",
        previewImg: "test2.png",
        tags: ["zxc2", "asd2"],
        statsLink: "zxczx2"

    }

    const gamesData = [
        {id: "101e15a6-bcd7-4c73-a7b6-1b1d11f44781", ...gameData1},
        {id: "101e15a6-bcd7-4c73-a7b6-1b1d11f44722", ...gameData2}
    ]

    let response: request.Response

    beforeAll( async () =>{
        const {email, password} = userData

        const res = await request(app)
        .post('/login')
        .send({email, password})
        .expect('Content-Type', /json/)
        .expect(202)


        response = res
    })

    afterEach(() =>{
        jest.clearAllMocks()
        jest.resetAllMocks()
    })

    it('should return all the games', async () =>{
        prisma.game.findMany = jest.fn().mockReturnValue(gamesData)

        const res = await request(app)
        .get('/game')
        .set("Cookie", [...response.header['set-cookie']])
        .expect('Content-Type', /json/)
        .expect(200)

        expect(prisma.game.findMany).toHaveBeenCalled()
    })

    it('should return a single game', async () =>{
        let gameId = gamesData[0].id
        prisma.game.findUnique = jest.fn().mockReturnValueOnce(gamesData.filter(v => v.id === gameId))

        const res = await request(app)
        .get(`/game/${gameId}`)
        .set("Cookie", [...response.header['set-cookie']])
        .expect('Content-Type', /json/)
        .expect(200)

        expect(prisma.game.findUnique).toHaveBeenCalled()
    })

    it('should register/add a game', async () =>{
        prisma.game.create = jest.fn().mockReturnValue({
            "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
            ...gameData1
        })

        const res = await request(app)
        .post('/game')
        .set("Cookie", [...response.header['set-cookie']])
        .send(gameData1)
        .expect('Content-Type', /json/)
        .expect(200)

        expect(prisma.game.create).toHaveBeenCalled()
    })

    it('should delete an existing game', async () =>{
        let gameId = gamesData[0].id
        prisma.game.delete = jest.fn().mockReturnValueOnce(gamesData.filter(v => v.id !== gameId))

        const res = await request(app)
        .delete(`/game/${gameId}`)
        .set("Cookie", [...response.header['set-cookie']])
        .expect('Content-Type', /json/)
        .expect(200)

        expect(prisma.game.delete).toHaveBeenCalled()
    })

    it('should return 401 if user is not logged in', async () =>{
        const res = await request(app)
        .post('/game')
        .send(gameData1)
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 404 if a game was not found', async () =>{
        prisma.game.findUnique = jest.fn().mockImplementationOnce((v: string) => {
            const data = gamesData.filter(gd => gd.id === v)
            return data.length === 0 && false
        })

        
        const res = await request(app)
        .get('/game/4a6de4ef-3f5e-46a0-b409-aa2cd2532509')
        .set("Cookie", [...response.header['set-cookie']])
        .expect(404)
    

        expect(prisma.game.findUnique).toBeCalled()
        expect(res.body.err).toBe('Game not found')
    })

    it('should not register/add a game if title field is missing', async () =>{
        prisma.game.create = jest.fn().mockReturnValue({
            "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
            ...gameData1
        })

        const res = await request(app)
        .post('/game')
        .set("Cookie", [...response.header['set-cookie']])
        .send({
            title: ""
        })
        .expect('Content-Type', /json/)
        .expect(400)

        expect(prisma.game.create).toHaveBeenCalledTimes(0)
    })

    it('should return error 500 if DB Fails', async () =>{
        prisma.game.findMany = jest.fn().mockImplementation(() =>{
            throw new Error('DB Error')
        })
        
        const res = await request(app)
        .get('/game')
        .set("Cookie", [...response.header['set-cookie']])

        expect(prisma.game.findMany).toBeCalled()
        expect(res.body.err).toBe('DB Error')
    })
})
