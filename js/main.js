
// making Video root Component being able to send custom events
APP.Helpers.makePublisher(APP.Video);
// making MoviesList Component being able to send custom events
APP.Helpers.makePublisher(APP.MoviesList);
// Subscribe Details Component on Video events
APP.Video.subscribe(APP.Details.init);
// Subscribe MoviesList Component on Video events
APP.Video.subscribe(APP.MoviesList.init);
// Subscribe Details Component on MoviesList events
APP.MoviesList.subscribe(APP.Details.drawPlaceHolder);

// call entry point of application
APP.Video.init();
