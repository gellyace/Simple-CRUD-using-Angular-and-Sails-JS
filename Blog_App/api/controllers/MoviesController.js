/**
 * MoviesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//var allMovies;
module.exports = {
  
  // Insert Movie in DB
  create: function(req, res, next) {
    var allMovies;

    var movieObj = {
      title: req.param('title'),
      genre: req.param('genre'),
      description: req.param('description'),
    };

    console.log("Here is my movieObj: ", movieObj);

    // Create a Movie with the params sent from view
    Movies.create(movieObj, function movieCreated (err, movie) {
  		if (err) return res.send(err,500);

      console.log('save');
  		//return res.redirect('/movies/index'); // FOR VIEW
    });
  },

  // Display All Movies created with options to edit and delete
  index: function(req, res){    
    var allMovies;
    
    Movies.find().exec(function (err, movies){
      if (err) return res.serverError(err);
    
      //return res.view('movies/index', {allMovies: movies});  // FOR VIEW
      return res.json({allMovies: movies}); // FOR JSON
    }); 
  },


  // Display Movie Details using movieId
  find: function(req, res){    
    var movies;
    var id = req.param('id');

  	if (!id) return res.send("No id specified.", 500);

  	 Movies.find(id, function movieFound(err, movie) {
  	 	if(err) return res.sender(err,500);
      if(!movie) return res.send("User "+id+" not found", 404);

       console.log('Movie found : ' + JSON.stringify(movie));
        //res.view('movies/find', { movies : movie[0] }); // FOR VIEW
        return res.json({ movies : movie[0] }); // FOR JSON
  	 });
  },

  // Update Existing Details
  update: function(req, res, next) {
    var allMovies;
    var id = req.param('id');
    var movieObj = {
      title: req.param('title'),
      genre: req.param('genre'),
      description: req.param('description'),
    };

    console.log("Here is my movieObj: ", movieObj);

    Movies.update(id, movieObj, function movieUpdated(err, movies) {
        if (err) {
          res.redirect('/movies/index');
        }

        console.log('update');
        //res.redirect('/movies/find/'+id); // FOR VIEW
    });
  },

  // Delete Record
  destroy: function(req, res){    
    var id = req.param('id');
		if (!id) return  res.send("No id specified.", 500);
    
    console.log(id);
  
		Movies.find(id, function foundMovies(err, movies) {
			if (err) return res.send(err,500);
			if (!movies) return res.send("No movie with that id exists.",404);

      console.log('find - delete');
			Movies.destroy(id, function moviesDestroyed(err) {
        if (err) return res.send(err,500);
        
        console.log('delete');
				//return res.redirect('/movies/index'); // FOR VIEW
			});
		});
  },
};