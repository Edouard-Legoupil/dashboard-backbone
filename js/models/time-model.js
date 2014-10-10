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
            //this.on("change:reset", 
            //  function(){ console.log('reset changed'); }
            //);

            //this.resetTimeModel = new ResetTimeModel();
            //this.resetTimeModel.parent = this;

            //this.presetsTimeModel = new PresetsTimeModel();
            //this.presetsTimeModel.parent = this;       
        }
    });
})();