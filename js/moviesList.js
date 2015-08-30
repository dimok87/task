var APP = APP || {};
/**
  * Component for holding movies list
  */
APP.MoviesList = (function() {
    var helpers = APP.Helpers,
        _movies = [];
    return {
        init: function(movies) {
            _movies = movies;
            // Build html markup
            APP.MoviesList.drawList();
        },
        drawList: function() {
            var list = helpers.create('ul'),
                item,
                image,
                info,
                nameLabel,
                yearLabel,
                i,
                moviesCount = _movies.length;
            list.id = 'movies-list';
            
            // Add event delegate for mouse click on each movie
            helpers.addEvent(list, 'click', function(e) {
                if(e.target && e.target.nodeName != "UL") {
                    var item = e.target.nodeName == "LI" ? e.target : helpers.closest(e.target, 'LI');
                    // if clicking element inside element list item fire an event
                    this.publish(item.movie);
                }
            }.bind(this));
            
            // build html for each movie one by one
            for (i = 0; i < moviesCount; i++) {
                
                // create list item
                item = helpers.create('li');
                item.className = 'movies-item';
                item.movie = _movies[i];

                // create container for movie info
                info = helpers.create('div');
                info.className = 'movies-item-info';
                
                // create img for movie
                image = helpers.create('img');
                image.src = helpers.imageDirectory() + _movies[i].images.cover;
                item.appendChild(image);
                
                // create movie title
                nameLabel = helpers.create('p');
                nameLabel.className = 'movies-item-title';
                nameLabel.innerHTML = _movies[i].title;
                info.appendChild(nameLabel);
                
                // create movie year
                yearLabel = helpers.create('p');
                yearLabel.className = 'movies-item-year';
                yearLabel.innerHTML = _movies[i].meta.releaseYear;
                info.appendChild(yearLabel);
                
                // appending to DOM
                item.appendChild(info);
                list.appendChild(item);
            }
            // appending list to DOM
            helpers.el('movies').appendChild(list);
        }
    };
}());