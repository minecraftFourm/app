export const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Minecraft Forum App API Documentation",
        version: "1.0.0",
        description:
          "This is the documentation of the Server API for Minecraft Forum App",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Test",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./src/routes/*.ts", "./src/app.ts"],
     explorer: true
  };