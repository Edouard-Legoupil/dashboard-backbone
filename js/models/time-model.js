/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    app.TimeModel = Backbone.Model.extend({
        defaults: {
          reset: false,
          preset: true,
          brushExtent: null
        },

        initialize: function () {
        }
    });
})();