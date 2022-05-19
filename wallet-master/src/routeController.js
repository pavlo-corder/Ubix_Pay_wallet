//const app=require('./app');
const mainView = require('./views/mainView');
const cameraView = require('./views/cameraView');

module.exports = {
    main: function() {
        app.appView.setMainView(new mainView(), false);
    },
    camera: function() {
        app.appView.setMainView(new cameraView(), false);
    }
};