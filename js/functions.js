var APP = APP || {};

/**
* Object with helper methods
*/
APP.Helpers = {
    /**
      * document.getElementById short notation
      *
      * @param {String} id of an element
      */
    el: function(id) {
        return document.getElementById(id);
    },
    /**
      * document.createElement short notation
      *
      * @param {String} tag name of an element
      */
    create: function(tag) {
        return document.createElement(tag);
    },
    /**
      * Get images path
      */
    imageDirectory: function() {
        return 'img/';
    },
    /**
      * Send ajax request to an url and trigger a callback
      * @param {String} requested url
      * @param {Function} triggered callback
      */
    get: function(url, callback) {
        var xhr;
        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
             }
        }
        xhr.onreadystatechange = function() {
            if(xhr.readyState < 4) {
                return;
            }
             
            if(xhr.status !== 200) {
                return;
            }
 
            if(xhr.readyState === 4) {
                callback(xhr);
            }           
        };
        xhr.open('GET', url, true);
        xhr.send('');
    },
    /**
      * Cross-browser adding event handlers  
      * @param {Object} HTML element
      * @param {String} event type
      * @param {Function} event handler
      */
    addEvent: function( obj, type, fn ) {
        if ( obj.attachEvent ) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
            obj.attachEvent( 'on'+type, obj[type+fn] );
        } else
            obj.addEventListener( type, fn, false );
    },
    /**
      * Cross-browser removing event handlers  
      * @param {Object} HTML element
      * @param {String} event type
      * @param {Function} event handler
      */
    removeEvent: function( obj, type, fn ) {
        if ( obj.detachEvent ) {
            obj.detachEvent( 'on'+type, obj[type+fn] );
            obj[type+fn] = null;
        } else
            obj.removeEventListener( type, fn, false );
    },
    /**
      * Get closest parent HTML element with specific tag 
      * @param {Object} HTML element
      * @param {String} searching element tag
      */
    closest: function(el, tag) {
        while (el.parentNode) {
            el = el.parentNode;
            if (el.tagName === tag)
                return el;
        }
        return null;
    },
    /**
      * Making an object being able to sending custom events
      * @param {Object} an object which will send events
      */
    makePublisher: function(o) {
        var i;
        for (i in APP.publisher) {
            if (APP.publisher.hasOwnProperty(i) && typeof APP.publisher[i] === "function") {
                o[i] = APP.publisher[i];
            }
        }
        o.subscribers = {any: []};
    }
};