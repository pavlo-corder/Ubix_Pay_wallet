const Mn = require('backbone.marionette');

const controller = require('./routeController');

module.exports = Mn.AppRouter.extend({
    controller: controller,
    appRoutes: {
        'app/': 'main',
        'app/camera/': 'camera',
        '*default': 'main'
    },
    onRoute: function(name, path, args) {
        console.log(`Navigated to ${path} (name: ${name}, args: ${args}`);
    }
});