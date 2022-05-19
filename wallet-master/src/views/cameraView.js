const Mn = require('backbone.marionette');
const jsQR = require('jsqr');
const template = require('./templates/camera.hbs');

const camerasSelectorView = require('./cameraSelectorView');
require('less/camera.less');

module.exports = Mn.View.extend({
    template: template,
    ui: {
        $preview: '#preview',
        $canvas: '#canvas',
        $debug: '#debug',
        $attept: '#attempt',
        $camera: '#camera'
    },
    regions: {
        cameras: '#cameras-switch'
    },
    events: {},
    childViewEvents: {
        'camera:changed': 'changeCamera'
    },
    initialize: function() {
        this._bProcessing = false;
        this._nAttempt = 0;

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                this._arrCameras = devices.filter(d => d.kind === 'videoinput');
//
            })
            .then(_ => {
                this.render();
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });

        this._frontCamera = false;
    },
    startTimer: function() {
        this._msecPrevRun = Date.now();
        if (this._timer) clearInterval(this._timer);
        this._timer = setInterval(this.tick.bind(this), 500);
    },
    tick: function() {
        requestAnimationFrame(this.scan.bind(this));
    },
    scan: function() {
        if (Date.now() - this._msecPrevRun < 500 || this._bProcessing) return;
        this._msecPrevRun = Date.now();
        if (this._video.readyState === this._video.HAVE_ENOUGH_DATA) {

            this._bProcessing = true;
            this._nAttempt++;
            this.ui.$attept.text(this._nAttempt);
            this._canvas.height = this._video.videoHeight;
            this._canvas.width = this._video.videoWidth;
            this._canvasCtx.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);
            const imageData = this._canvasCtx.getImageData(0, 0, this._canvas.width, this._canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert"
            });
            if (code && code.data !== '') {
                alert(`Recognized! "${code.data}"`);
            }
            this._bProcessing = false;
        }
    },
    onRender: function() {
        this._canvas = this.ui.$canvas[0];
        this._canvasCtx = this._canvas.getContext("2d");

        // Навигацию назад!
        if (!this._arrCameras || !this._arrCameras.length) return;
        this.ui.$debug.text(JSON.stringify(this._arrCameras, undefined, 2));
        this.drawCameraControl();
        this.startTimer();
        this.initCamera();
    },
    onBeforeDetach: function() {
        if (this._videoTrack && this._videoTrack.stop) this._videoTrack.stop();
        if (this._timer) clearInterval(this._timer);
    },
    drawCameraControl: function() {
        if (this._arrCameras && this._arrCameras.length > 1) {
            this.showChildView('cameras', new camerasSelectorView());
        }
    },
    changeCamera: function() {
        this._frontCamera = !this._frontCamera;
        this.initCamera();
    },
    initCamera() {
        const constraints = {
            video: {
                facingMode: (this._frontCamera ? "user" : "environment")
            }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                this.ui.$camera.text(this._frontCamera ? "user" : "environment");

                this._video = this.ui.$preview[0];
                this._video.srcObject = mediaStream;

                const arrTracks = mediaStream.getTracks();
                this._videoTrack = arrTracks[0];
                console.dir(this._videoTrack.getCapabilities(), {colors: true, depth: null});
            })

            // Обработка "NotAllowedError" - показывать popup "разрешить" и по нему - render()
            .catch(err => console.error(err));
    }
});