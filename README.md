# `Electric_Vehicle_Charging_Locations`

This app shows a map of electric vehicle charging locations in the UK.


## Getting Started

To get you started you can simply clone the `Electric_Vehicle_Charging_Locations` repository and install the dependencies:

### Prerequisites

You need git to clone the `Electric_Vehicle_Charging_Locations` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `Electric_Vehicle_Charging_Locations`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `Electric_Vehicle_Charging_Locations`

Clone the `Electric_Vehicle_Charging_Locations` repository using git:

```
git clone https://github.com/eddiegrahamdev/Electric_Vehicle_Charging_Locations.git
cd Electric_Vehicle_Charging_Locations
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`Electric_Vehicle_Charging_Locations` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    infoPanel/              --> infoPanel related components
      charging-location-info-pane.js
      charging-location-info-pane.html
      charging-location-info-pane_test.js
  views/                --> app's views
    home/                   --> home view
        home.html
        home.js
        home_test.js
    about/                  --> about view
        about.html
        about.js
        about_test.js
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js           --> config file for running unit tests with Karma
```

### Running Unit Tests

The `Electric_Vehicle_Charging_Locations` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have an `_test.js` suffix (e.g.
  `home_test.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

### Browser and Device Compatibility

The app has been smoke tested against the cutting edge versions of Chrome, Edge and Firefox.
The app should also be responsive to devices with smaller viewports. This has been tested using Chrome's native device simulator.

## Contact

For more information please contact eddiegrahamdev@gmail.com.


[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
