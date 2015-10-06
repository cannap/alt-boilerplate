# alt-boilerplate

A boilerplate app built with React and alt. Based on [Josh Perez's isomorphic implementation](https://github.com/goatslacker/alt). 

## Javascript guidelines
All JS code should adhere [these guidelines](https://github.com/airbnb/javascript)

## Application Setup

Install Bower, Webpack and Gulp globally through npm.

```
npm install bower -g
npm install gulp -g
npm install webpack -g
```

Install local node and bower modules:

```
npm install
bower install
```

Copy `config.js.example` in `config.js` and edit `API_ROOT` with the HOSTNAME or IP of the API endpoint.

```
this.config = {
  development: {
    API_ROOT: 'http://ip or hostname:port'
  },
  production: {
    API_ROOT: 'http://ip or hostname:port'
  }
}
```

Run the application in the development environment:

```
gulp
```

or build the application for production  

```
gulp build
```

The app runs at `http://localhost:8080`

