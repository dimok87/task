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
            // appending list to DOM
            helpers.el('movies').innerHTML = tmpl("movies_list_tmpl", {data : _movies});
            // Add event delegate for mouse click on each movie
            helpers.addEvent(helpers.el('movies-list'), 'click', function(e) {
                if(e.target && e.target.nodeName != "UL") {
                    var item = e.target.nodeName == "LI" ? e.target : helpers.closest(e.target, 'LI');
                    // removing selected className from all list items before selecting choosed one
                    var listItems = helpers.el('movies-list').getElementsByTagName('li');
                    for (var i = 0; i < listItems.length; i++) {
                        listItems[i].className = 'movies-item';
                    }
                    // selecting choosing item
                    item.className += " selected";
                    // if clicking element inside element list item fire an event
                    var movieId = item.getAttribute('rel');
                    this.publish(_movies[movieId]);
                }
            }.bind(this));
        }
    };
}());