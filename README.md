# SpotifyApiExercise
This application utilizes the Spotify Developer API to query information about a song, artist, or album. The intent of this project is to provide a working example of a REST API utilizing Angular 8 and PHP 7. A simple PHP script is used to request an access token by encoding the [developers public and privtate key](https://developer.spotify.com/dashboard/applications) and posting it to the provided api token url. Once the token is obtained, it is returned to the front-end which can now query the necessary data via https POST services. The front-end also controls a timeout script to renew the token every 3600s which prevents the token from expiring and the user experiencing errors. 


The user is able to search for a song title or artist with an HTML form.
Example Output:
This sample demonstrates:
* Artist Results
  * Image
  * Name
  * Genre
  * Top track list
    * Name
    * Image
    * Ablum type (full or single)
    * Release date
    * Spotify link
  * Artist album list
    * Popularity
    * Mame
    * Image
    * Album name
    * Duration
    * Spotify link
    * Preview link
* Song Results
  * Popularity
  * Name
  * Image
  * Artist
  * Album
  * Album release date
  * Duration
  * Spotify link
  * Preview link


## Build

Run `npm install` to install all necessary node modules.

Run `npm build-dev` to build the project and watch for changes. The build artifacts will be stored in the `/dist/spotify-api-exercise` direcotry.

Run `ng build --prod` for a prodction build. The build artifacts will also be stored in the `/dist/spotify-api-exercise` directory.

 
You will need an Apache/PHP web server to serve the files. [Docker](https://www.docker.com/get-started) or [MAMP](https://www.mamp.info/en/downloads/) are both good options.



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## ~~Running unit tests~~

~~Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).~~

## ~~Running end-to-end tests~~

~~Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).~~

## Built With

* [Angular 8.3.5](https://angular.io/)
* [PHP 7.3.11](https://www.php.net/)
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
