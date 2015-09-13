'user strict';

// Middleware to delay requests so we can simulate request delays
exports.delay = function(req, res, next) {
  var r = Math.random() * 1000;
  setTimeout(function() {
    next();
  }, r < 100 ? 100 : r);
};


// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
exports.exposeTemplates = function(app, hbs) {
  return function(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('views/partials/shared', {
      cache      : app.enabled('view cache'),
      precompiled: true
    }).then(function(templates) {
      // RegExp to remove the ".handlebars" extension from the template names.
      var extRegex = new RegExp(hbs.extname + '$');

      // Creates an array of templates which are exposed via
      // `res.locals.templates`.
      templates = Object.keys(templates).map(function(name) {
        return {
          name    : name.replace(extRegex, ''),
          template: templates[name]
        };
      });

      // Exposes the templates during view rendering.
      if (templates.length) {
        res.locals.templates = templates;
      }

      setImmediate(next);
    })
    .catch(next);
  };
};
