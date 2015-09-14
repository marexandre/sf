# Forum Prototype
Challenge to design and prototype a forum :pray:


## Demo
https://fierce-sands-9435.herokuapp.com/

**※ Header and Footer were added so the forum feels more like a Strava site, they don't function fully as the originals on (Strava.com)[https://www.strava.com/dashboard]**


## Design
Please look at the following links for understanding design related decisions.
- Design detail documentation is here: [sf/design/README.md](https://github.com/marexandre/sf/blob/master/design/README.md)
- Design Sketch file and screen shots are here: [sf/design/StravaForum.sketch](https://github.com/marexandre/sf/blob/master/design/StravaForum.sketch)


## File Structure

#### Back-end
```
|-- sf
    |-- api
    |   |-- api.js                    # API related endpoint here
    |-- app
    |   |-- app.js                    # web application endpoints here
    |-- data                          # JSON mock data here
    |-- shared
    |   |-- js                        # JS files shared across back-end and front-end
    |-- views
    |   |-- layouts
    |   |   |-- main.handlebars       # main handlebars layout
    |   |-- partials
    |   |   |-- header.handlebars
    |   |   |-- footer.handlebars
    |   |-- index.handlebars          # Forum top page HTML
    |-- server.js                     # Express server initialization & setup
```

#### Front-end
```
|-- sf
    |-- public
    |   |-- assets                    # All assets, svg, png are here
    |   |-- css                       # SASS files get build here
    |   |-- js                        # Files in src get build here
    |   |   |-- src                   # All front-end related JS file here
    |-- sass
    |   |-- app.scss                  # Main file for SASS
    |-- shared
    |   |-- js                        # JS files shared across back-end and front-end
```

#### Following files are heavily reusing HTML/CSS/images from [strava.com](http://strava.com/):
- `views/partials/header.handlebars`
- `views/partials/footer.handlebars`
- `views/partials/ajax_loader.handlebars`
- `views/partials/ajax_loader.handlebars`
- `public/assets/sprites/**/*.png`
- `public/assets/website/**/*.svg`
- `public/assets/svg/strava-logo-****.svg`
- `public/css/strava-app-icons.css`
- `sass/_strava.scss`


## Technology choices
- [Node.js](https://nodejs.org/en/)
  - Personally most familiar with developing and prototyping server side or middleware applications
- [express](http://expressjs.com/)
  - Fast and minimalist web framework, which is why I use it for all my prototyping that involves server side coding
  - Supper easy to deploy to [Heroku](http://heroku.com) for demos
- [handlebars](http://handlebarsjs.com/)
  - Can share templates between front-end & back-end
  - Simple syntax
  - Easily extendable with custom helpers
  - One of the popular templating engines, easy to find documents/examples, shouldn't be too difficult for other dev's to understand
  - Simple syntax makes it easy to swap with other templating engines
- [Bootstrap 3.3](http://getbootstrap.com/)
  - Been using it in production for more then a year, great for responsive design and quick prototyping
  - Lot's of documentations
  - Used in [Strava LOCAL](http://www.strava.com/local)
- [jQuery](https://jquery.com/)
  - Supper easy to prototype with
  - Been using it for years
  - (Not always use it production)
- [sass](http://sass-lang.com/)
  - Prefer `scss` syntax, beet using in production for years
  - If possible would use this as much as possible
- [autoprefixer](https://github.com/postcss/autoprefixer)
  - Parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/)
  - Makes writing css much easier
  - Use this for almost all my CSS/SCSS coding at work or in private projects
- [browserify](http://browserify.org/)
  - Makes it easy to share modules between fornt-end & server side code
- [jshint](http://jshint.com/) & [JSCS](http://jscs.info/)
  - Helps keeping code consistent & keeping small mistakes out
  - Alway include into my projects, work or in private projects
  - If possible would use this as much as possible


## Developing/Running locally
You would need [Ruby](https://www.ruby-lang.org/en/) and [Node.js](https://nodejs.org/en/) installed.

Hopefully should work... :pray:
~~(If not, file an GitHub issue)~~
#### Installing dependencies
```shell
bash setup.sh
```
#### Running web app server
```shell
node server.js
```
Open this URL in your browser [http://localhost:8999](# express server)

#### Developing
```shell
gulp dev
```
This command will watch any `.scss` or `.js` file changes and restart the web server.

#### Building
```shell
gulp
```
For now mainly builds `.scss` files.
