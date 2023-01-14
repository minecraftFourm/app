import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import crypto from 'crypto'
import * as argon from 'argon2';


const main = async () => {
    const salt = crypto.randomBytes(128)
    const password = await argon.hash("adminuser", { salt })

    const defaultRole = await prisma.role.upsert({
        where: {
            id: "264ed4b4-9312-4766-9c7d-47f8f0ebecd1"
        },
        update: {},
        create: {
            id: "264ed4b4-9312-4766-9c7d-47f8f0ebecd1",
            title: "Member",
            color: "#363636",
            canCreatePost: true,
            canCreateComment: true,
            canDeleteComment: true,
            canDeletePost: true,
            canEditPost: true,
            canEditComment: true
        }       
    })

    const adminRole = await prisma.role.upsert({
        where: {
            id: "10b932a3-b8dd-4fc2-82b8-862bdef143bb"
        },
        update: {},
        create: {
            id: "10b932a3-b8dd-4fc2-82b8-862bdef143bb",
            title: "Admin",
            color: "#FF0000",
            canCreatePost: true,
            canCreateComment: true,
            canDeleteComment: true,
            canDeletePost: true,
            canEditPost: true,
            canEditComment: true,
            isAdmin: true,
            isStaff: true,
            canEditAdmin: true,
            canCreateCategory: true,
            canCreateRole: true,
            canDeleteCategory: true,
            canDeleteOtherComment: true,
            canDeleteOtherPost: true,
            canDeleteRole: true,
            canEditCategory: true,
            canEditOtherComment: true,
            canEditOtherPost: true,
            canEditRole: true,
            canEditUsers: true,
            canManageUsers: true,
            canPostAdmin: true,
            canRemoveUsers: true
        }       
    })

    const adminUser = await prisma.user.upsert({
        where: {
            id: "bc86519b-12b6-4dec-96f1-b6888ce023e3"
        },
        update: {},
        create: {
            email: "admin@example.com",
            password,
            username: "admin",
            roleId: "10b932a3-b8dd-4fc2-82b8-862bdef143bb"
        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
    console.log("Finished pre-populating database.");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })