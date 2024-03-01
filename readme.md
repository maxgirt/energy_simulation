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
4. CD into the back-end folder
5. npm install
6. npx prisma migrate dev
7. npx prisma generate
8. npm start
9. CD into the front-end folder
10. npm install
11. npm run dev


# Technologies Used # 

- Node.js
- Prisma
- Postgres
- Apollo Server
- graphql
- React
- Chart.js
- Docker

![alt text](<Screenshot 2024-03-01 at 11.40.17 AM.png>)
![alt text](<Screenshot 2024-03-01 at 11.40.51 AM.png>)
