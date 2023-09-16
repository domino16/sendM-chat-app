 # Angular 15 / Spring Boot + PostgreSQL

<table>
<tr>
<td>
  <a href="https://sendm.site">
    <img src="./img/ganatan-about-github.png" align="right"
    alt="sendM example demo" width="140" height="140">
  </a>

it's a repo designed to create a **Web Application with Angular 16**


* Frontend - [**Angular 15.2**](https://github.com/angular/angular/releases)

* Backend - [**Spring Boot 3.0 & Spring Boot 3.1**](https://spring.io/projects/spring-boot) 

* Database - [**PostgreSQL**](https://www.postgresql.org/download/)

* See the [**Live demo**](#live-demo), Test the repo with [**Quick start**](#quick-start) and for more information Read the step by step [**Tutorial**](#tutorial) or read the [**Getting started**](#getting-started)


</td>
</tr>
</table>

# [Live Demo](#live-demo)
Here is a working live demo :  https://sendm.site


<p align="center">
  <p align="center">
    <a href="https://sendm.site/">
      <img src="https://media.giphy.com/media/Httu2q4FWTGfBUxhnv/giphy.gif" alt="Angular 15
      Application"/>
    </a>
  </p>
</p>



# Lighthouse Audit

<p align="center">
  <p align="center">
    <a href="https://sendm.site">
      <img src="https://imgur.com/tWh5RKV" alt="sendM Lighthouse SEO Angular Example Demo"/>
    </a>
  </p>
</p>


## Table of contents

- [Status](#status)
- [Quick start](#quick-start)
- [Front-end](#front-end)
- [Back-end](#back-end)
- [Author](#author)

### Front-end : What's included
> Dependencies
- [x] Angular : 15.2.0
- [x] Angular CLI : 15.2.0
- [x] Angular Universal : 15.2.0
- [x] Fontawesome : 6.4.2

> Features
- [x] Routing
- [x] Lazy Loading
- [x] Web Socket
- [x] Server Side Rendering
- [x] Progressive Web App
- [x] Responsive Layout
- [x] Search Engine Optimization (SEO)
- [x] Components
- [x] Services
- [x] Reactive Form
- [x] Template Driven Forms
- [x] Search



## Quick start

```bash

# download the example or clone the repo from github
git clone https://github.com/domino16/chat-frontend.git

# change directory
cd chat-frontend

# install the repo with npm
npm install

# start the server
npm start

```
in your browser go to [http://localhost:4200](http://localhost:4200) 


## Front-end

### Installation
* `npm install` (installing dependencies)
* `npm outdated` (verifying dependencies)

### Developpement
* `npm run start`
* in your browser [http://localhost:4200](http://localhost:4200) 

## Linter
* `npm run lint`

## Tests
* `npm run test`

### Compilation
* `npm run build`       ( without SSR)
* `npm run build:ssr`   ( with SSR)

### Production
* `npm run serve:ssr`
* in your browser [http://localhost:4000](http://localhost:4000) 


## Serving CRUD REST API with Node.js & Express & PostgreSQL

## PostgreSQL Password
* dbUser: "postgres"
* dbPassword: "123"   

```bash

# select the repo
cd postgresql-express-crud

# install the repo with npm
npm install

# Serve CRUD REST API : development mode with nodemon
npm run dev

# Serve CRUD REST API : local mode
npm run start

# Serve CRUD REST API : production mode
npm run prod

# Serve CRUD REST API : production mode with pm2 (process manager)
pm2 start process.config.js --env prod


```

### Tests API & PostgreSQL
* in your browser [http://localhost:8081/users](http://localhost:8081/users) 
* in your browser [http://localhost:8080/chats](http://localhost:5004/chats) 

### Author
* Author  : Dominik Pietrzyk

