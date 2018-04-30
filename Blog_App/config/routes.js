/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
// Webpages

  '/': { view: 'pages/homepage' }, // Home Page
  
  'post /movies/index': 'MoviesController.create', // Add Movie Modal -> save to DB -> movies/index
  'get /movies/index' : 'MoviesController.index', // Display Movie List & Display & Delete Movie

  'get /movies/add' : { view: 'movies/new_movie'}, // Add New Movie Page
  'post /movies/create': 'MoviesController.create', // Add Movie Modal -> save to DB -> movies/index

  'get /movies/find/:id' : 'MoviesController.find', // View Movie Modal
  'post /movies/find/:id': 'MoviesController.update', // Update Movie -> save to DB -> movies/index

  'get /movies/destroy/:id' : 'MoviesController.destroy', // Delete Movie Record 
 
};