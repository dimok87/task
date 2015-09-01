var APP = APP || {};
/**
  * Component for holding selected movie video
  */
APP.Details = (function() {
    var helpers = APP.Helpers,
        _selectMovie = {};  
    return {
        init: function(movies) {
            _selectMovie = movies[0];
            // Build html markup for selected movie
            APP.Details.drawPlaceHolder(_selectMovie)
        },
        drawPlaceHolder: function(movie) {
            // add to DOM
            helpers.el('details').innerHTML = tmpl("movies_details_tmpl", {data : {movie : movie, directors: APP.Details.getDirectorsByList(movie)}});
        },
        /**
          * Directors list as string 
          * @param {Object} Selected movie
          */
        getDirectorsByList: function(movie) {
            var directorsString = '',
                i,
                directors = movie.meta.directors,
                directorsCount = movie.meta.directors.length;
            for (var i = 0; i < directorsCount; i++) {
                directorsString += directors[i]['name'] + ( i != directorsCount - 1 ? ', ' : '');
            }
            return directorsString;
        }
    }
}());