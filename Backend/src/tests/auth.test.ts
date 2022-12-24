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
            argonMock.mockImplementationOnce(async (x, y) =>{
                return x==y
            })

            await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(202)

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

        it('should validate user password', async () =>{
            const {username, password, email} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })

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

            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(400)

            expect(prisma.user.findUnique).toBeCalled()
            expect(res.body.err).toBe('Email not found')

        })
        it('should return error 400 when user password is invalid', async() =>{
            const {username, password, email} = userData
            prisma.user.findUnique = jest.fn().mockReturnValue({
                "id": "101e15a6-bcd7-4c73-a7b6-1b1d11f44781",
                username,
                email,
                password
            })

            argonMock.mockImplementationOnce(async (x, y) =>{
                return x!=y
            })
            const res = await request(app)
            .post('/login')
            .send({email, password})
            .expect('Content-Type', /json/)
            .expect(400)

            console.log(argonMock.mock.results[0])
            expect(res.body.err).toBe('Invalid Password')
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