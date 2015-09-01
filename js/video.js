var APP = APP || {};
/**
  * Main application component
  */
APP.Video = (function() {
    var _movies = [];
    return {
        /**
          * Entry point of Application
          *
          */
        init: function() {
            // sending ajax request for movies list
            APP.Helpers.get(APP.Config.dataUrl, function(xhr) {
                _movies = JSON.parse(xhr.responseText);
                if (!_movies || _movies.length === 0) {
                    throw {
                        name: "ServerError",
                        message: "There are not any movies in response"
                    };
                }
                // fire event when get data from server
                this.publish(_movies);
            }.bind(this));
        }
    }
}());