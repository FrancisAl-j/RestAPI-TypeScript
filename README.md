## Starting with TypeScript, NodeJs and ExpressJs

# Setup

- npm init -y
- npm install express cors dotenv
- npm i typescript ts-node @types/node @types/express @types/cors nodemon --save-dev

# setup the tsconfig.ts

- npx tsc --init
- After creating a tsconfig.ts put this inside:
  {
  "compilerOptions": {
  "target": "ES6",
  "module": "CommonJS",
  "rootDir": "./server",
  "outDir": "./dist",
  "strict": true
  "esModuleInterop": true // Necessary for import if this is not here it will cause an error
  }
  }
- then create directory folder named "server" based that on your rootDir

## Things to remember

- Do not put ("type": "module") the server won't run. Meaning you don't need to add that to your package.json file

To get started
go to file vite.config.ts and read the comment

## MEMOIZE / MEMOIZATION

## Debouncing

- What is debouncing? It is a technique use to prevent the search from calling API from the server every key press

## createAsyncThunk

What is it?

Why do we use it?

What problem does it solve?

How does it work?

-
