const app = require('http_server');
const sessionMW = require('storage').sessionMW;

module.exports = function (io) {

	module.exports = io;

	app.emit('restapp_wssready');
}