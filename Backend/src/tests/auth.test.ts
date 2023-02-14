import request from 'supertest'
import {app} from '../app'
import prisma from '../db/prisma.client'
import argon from 'argon2'
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';


describe('auth test suite', ()=>{


    afterEach(() =>{
        jest.clearAllMocks()
        jest.resetAllMocks()
    })
    
    describe('/login test', () =>{
        afterEach(() =>{
            jest.clearAllMocks()
            jest.resetAllMocks()
        })

        const userData = {
            id: "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
            password: "testing123",
            email: 'testing@gmail.com',
            invalid_email: "zxc@asd.com",
            username: "testuser"
        }


        const jwtMock = jest.spyOn(jwt, 'sign')
        const argonMock = jest.spyOn(argon, 'verify')
        it('should call sign in', async () =>{
            const {email,username, password} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })

            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(202)
            
            console.log(res.body.err)
            expect(prisma.user.findUnique).toBeCalled()


            expect(jwtMock).toHaveBeenCalled()
        })

        it('should return user values after success sign in', async () =>{
            const {email, password, username, id} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })
            

            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(202)

            expect(res.body).toEqual({id, email, username})
            expect(prisma.user.findUnique).toHaveBeenCalled()

            expect(jwtMock).toHaveBeenCalled()

        })


        it("should return 400 if user entered invalid email", async () => {
            const {email, password, username, id} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })
            

            const res = await request(app)
            .post('/login')
            .send({email: "zxczxczxc", password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toEqual("Please input a valid email")
        })
        it("should return 400 if user entered invalid password", async () =>{
            const {email, password, username, id} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })
            

            const res = await request(app)
            .post('/login')
            .send({email, password: "qweasd"})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toEqual("Invalid Password")
        })

        it('should validate user password', async () =>{
            const {username, password, email} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })
            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(202)

            expect(argonMock.mock.results[0].value).toBeTruthy()
        })

        it('should return error 400 when email is not found', async () =>{
            const {email, password} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue(null)
            prisma.user.update = jest.fn().mockReturnValue(true)

            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(prisma.user.findUnique).toBeCalled()
            expect(res.body.err).toBe('Email not found')

        })
        it('should return error 400 when user password was not matched', async() =>{
            const {username, password, email} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            prisma.user.update = jest.fn().mockReturnValue(true)
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x!=y
            })
            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toBe('Invalid Password')
        })


        it('should return error 500 if DB Fails', async () =>{
            const {email, password} = userData
            prisma.user.findUnique = jest.fn().mockImplementation(() =>{
                throw new Error('DB Error')
            })
            prisma.user.update = jest.fn().mockReturnValue(true)

            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(500)

            expect(prisma.user.findUnique).toBeCalled()
            expect(res.body.err).toBe('DB Error')
        })
    })

    describe('/register test', () =>{
        afterEach(() =>{
            jest.clearAllMocks()
            jest.resetAllMocks()
        })


        const userData = {
            id: "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
            password: "testing123",
            invalid_pass: "pass",
            email: 'testing@gmail.com',
            invalid_email: "zxcasd.com",
            username: "testuser",
            invalid_user: "test",
        }

        
        const jwtMock = jest.spyOn(jwt, 'sign')
        const argonMock = jest.spyOn(argon, 'verify')
        it('should call register router', async () =>{
            const {email,username, password} = userData
            prisma.user.create = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })

            await request(app)
            .post('/register')
            .send({username, email, password})
            .expect('Content-Type', /json/)
            .expect(201)

            expect(prisma.user.create).toBeCalled()
            expect(jwtMock).toHaveBeenCalled()
        })

        it('should return user values after success registration', async () =>{
            const {email, password, username, id} = userData
            prisma.user.create = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })
            

            const res = await request(app)
            .post('/register')
            .send({email, username, password})
            .expect('Content-Type', /json/)
            .expect(201)

            expect(res.body).toEqual({id, email, username})
            expect(prisma.user.create).toHaveBeenCalled()

            expect(jwtMock).toHaveBeenCalled()

        })

        it('should return error 400 when invalid username was entered', async () =>{
            const {invalid_user, username, password, email} = userData
            prisma.user.create = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })


            const res = await request(app)
            .post('/register')
            .send({email, username: invalid_user, password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toBe("Invalid Username.")
        })

        it('should return error 400 when invalid password was entered', async () =>{
            const {email, username, password, invalid_pass} = userData
            prisma.user.create = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })

            const res = await request(app)
            .post('/register')
            .send({email, username, password: invalid_pass})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toBe('Invalid Password.')
        })


        it('should return error 400 when invalid email was entered', async () =>{
            const {email, username, password, invalid_email} = userData
            prisma.user.create = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })

            const res = await request(app)
            .post('/register')
            .send({email: invalid_email, username, password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(res.body.err).toBe('Invalid Email.')
        })



        it('should return error 500 if DB Fails', async () =>{
            const {email, password} = userData
            prisma.user.findUnique = jest.fn().mockImplementation(() =>{
                throw new Error('DB Error')
            })
            
            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(500)

            expect(prisma.user.findUnique).toBeCalled()
            expect(res.body.err).toBe('DB Error')
        })

    })
})