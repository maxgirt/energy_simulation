# Easy Set Up Instructions #

Uses ports 3000 and 4000

1. Clone the repository
2. CD into the root folder
3. docker-compose up
4. Open the browser and go to http://localhost:3000

# Otherwise #

1. Clone the repository
2. set up the postgres database 
3. update the prisma schema with the database connection url
4. npx prisma migrate dev
5. npx prisma generate
6. CD into the front-end folder
7. npm install
8. npm run dev
9.  CD into the back-end folder
10. npm install
11. npm start


# Technologies Used # 

- Node.js
- Prisma
- Postgres
- Apollo Server
- graphql
- React
- Chart.js
- Docker