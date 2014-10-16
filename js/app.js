/*global $ */
/*jshint unused:false */
var app = app || {};


$(function () {
  'use strict';

  app.appModel = new app.AppModel();

  new app.AppView({model: app.appModel});

  var router = new app.AppRouter({model: app.appModel});
});