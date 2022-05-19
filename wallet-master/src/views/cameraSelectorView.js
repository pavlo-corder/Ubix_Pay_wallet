const Mn = require('backbone.marionette');
const template = require('./templates/cameraList.hbs');

module.exports = Mn.View.extend({
    template: template,
    ui: {
        $camera: 'button'
    },
    triggers: {
        'click @ui.$camera': 'camera:changed'
    },
    initialize: function(options) {
    },
});