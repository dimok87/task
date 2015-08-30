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
            if (helpers.el('movies-placeholder')) {
                // remove from DOM if there is HTML node for movie
                helpers.el('details').removeChild(helpers.el('movies-placeholder'));
            }
            var placeholder = helpers.create('div'),
                nameLabel = helpers.create('p'),
                infoLabel = helpers.create('p'),
                description = helpers.create('div'),
                video = helpers.create('video'),
                noSupportText = document.createTextNode('Your browser does not support the video tag.'),
                source,
                streams = movie.streams,
                streamsCount = streams.length,
                i;
            
            placeholder.id = 'movies-placeholder';

            // add video
            video.width = 714;
            video.height = 410;
            video.controls = true;

            // add source types for video
            for (i = 0; i < streamsCount; i++) {
                source = helpers.create('source');
                source.src = streams[i].url;
                source.type = 'video/' + streams[i].type;
                video.appendChild(source);
            }
            video.appendChild(noSupportText);

            description.className = 'movies-description';
            
            // add title with year
            nameLabel.innerHTML = movie.title + ' ( ' + movie.meta.releaseYear + ' ) ';
            nameLabel.className = 'movies-title';
            
            // add directors as string
            infoLabel.innerHTML = 'Directors: ' + APP.Details.getDirectorsByList(movie);
            infoLabel.className = 'movies-info';

            description.appendChild(nameLabel);
            description.appendChild(infoLabel);
            
            placeholder.appendChild(video);
            placeholder.appendChild(description);
            
            // add to DOM
            helpers.el('details').appendChild(placeholder);
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