# angular-bookShop-app
app to do unit tests with Jasmine and Karma

## Getting started backend

Install JSON Server

    npm install -g json-server

Create db.json file with some data

Start JSOn Server

    json-server --watch db.json

## Getting started front-end

    npm start

## start testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

    ng test

- in each file .spec will create a describe and .
- We will create a file for a each component p.e. cart.
     rute src/app/pages/cart/cart.component.spec.ts
- Create file coverage
  
    ng test --code-coverage

### important ###
>Los test no siempre se relizan paralelamente
>
# BookShopApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


