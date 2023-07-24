# **Minecraft Forum App**

This is a forum app built around the Minecraft theme. It's main purpose is to be used as a way of communication between players from a specific Minecraft server.

### Tech Stack

Backend: Postgres, Node JS, ExpressJS, Cloudinary, Typescript, Prisma, and Jest

Frontend: React, Tailwind

#### Getting started

1. Create a ".env" file, and place it in the Backend directory.

```├── Backend/
│   ├── src
│   ├── prisma
│   └── .env  <–––
├── Frontend/
│   ├── src
│   ├── dlist
└── ...
```

2. Copy, and paste the following inside the file and fill it up.

```PORT = 5000
JWT_SECRET_KEY = "SomeSecretValueHere"
DATABASE_URL="postgresql://admin:root@forumproject-db-1:5432/dev"
CLOUDINARY_URL=""
COOKIE_SECRET="SomeSecretValueHere"
```

3. To get your "CLOUDINARY_URL", visit this [website](https://cloudinary.com), and sign up
4. Run the app using `docker compose up`
5. You should be able to access the app by visiting `localhost:3000`
