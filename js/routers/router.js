var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {
    'from/:from/to/:to': 'updateState'
  },

  // Listen to model changes to update the url route
  initialize: function(attributes) {
    this.model = attributes.model;

    this.listenTo(this.model.timeModel, 'change:brushExtent', function(m) {
        this.updateUrl(m.get('brushExtent'),m.get('brushEmpty') );
    });
  },

  updateState: function(from, to) {

    from = new Date(from),
    to = new Date(to);

    this.model.timeModel.set({
      brushExtent: [from, to],
      brushEmpty: false,
      reset: true,
      preset: false
    });
  },

  updateUrl: function(extent, brushEmpty) {
    if (brushEmpty) {
        this.navigate('');
    } else {
        var urlTpl = _.template('from/<%= from %>/to/<%= to %>'),
        fromString = extent[0].toDateString(),
        toString = extent[1].toDateString();
        this.navigate(urlTpl({from: fromString, to: toString}), {trigger: true});

    }
  }
});