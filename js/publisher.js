var APP = APP || {};
APP.publisher = {
    /**
      * Subscribers list
      */
    subscribers: {
        any: []
    },
    /**
      * Subscribe object callback on custom event
      * @param {Function} event handler on event raising
      * @param {String} event type
      */
    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    /**
      * Unsubscribe object callback on custom event
      * @param {Function} event handler on event raising
      * @param {String} event type
      */
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    /**
      * Fire a custom event
      * @param {Object} Event payload
      * @param {String} event type
      */
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    /**
      * Execution subscribers callbacks
      * @param {String} Subscribing type
      * @param {Object} Event payload
      * @param {String} event type
      */
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;
            
        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};