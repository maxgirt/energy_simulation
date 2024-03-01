# Setup #
- npm init -y                                
- npm install typescript ts-node @types/node --save-dev
- npx tsc --init
- npm install prisma --save-dev
- npx prisma init
- npm install @prisma/client

# Prisma Setup #
make migrations
- npx prisma migrate dev --name init
- npx prisma generate

# Apollo/GraphQL Setup #
- npm install apollo-server graphql