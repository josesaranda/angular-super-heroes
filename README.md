# angular-super-heroes

This is a project made for fun with Angular, Typescript, Scss

## Requirements

- nodejs v16 installed

## Scripts

- `npm install` Install all needed dependencies
- `npm test` Run all tests
- `npm run test:coverage` Run all tests with coverage
- `npm start` Run project in development mode
- `npm run build` Generates distribution files
- `npm run start:mockserver` Run mockserver in port 8080

#### Scripts notes

To make angular client to call mockserver endpoints, please go to `environments/environment.development.ts` and set `baseURL` value to `http://localhost:8080`
**Make sure** you're running both process `npm start` and `npm run start:mockserver`

#### Running super-heroes-app using docker

- `docker-compose up`

or

- `docker build -t super-heroes-app .`
- `docker run --name super-heroes-container -p 80:80 super-heroes-app`

## Notes

Create a service which is going to store all the information and it has to:

[x] get all super heroes  
[x] get just one hero by id  
[x] get all heroes that match with the given name  
[x] update a hero  
[x] delete a hero  
[x] create a hero  
[x] create unit tests for this service

Create a component which will be able to:

[x] show a paginated list of heroes where will appear two buttons with the text "Editar" and "Borrar"  
[x] show an input for searching heroes by the given text  
[x] show an empty form when pressing "Añadir"  
[x] show confirmation dialog when user clicks on "Borrar"  
[x] delete hero when user clicks on "Borrar" inside the dialog  
[x] create unit tests for this component

Addionataly:

[x] Information should be stored inside service  
[x] use good practices  
[x] use angular material  
[x] use routes and navigation  
[x] use docker somehow  
[ ] use interceptor for showing a loading element  
[x] use a directive to make edit field value uppercase (used scss instead)  
[x] use mockserver somehow  
[x] communication between components  
[x] use reactive programming  
[x] use lambdas

Extra:

[x] add pipeline and run build and test procces
