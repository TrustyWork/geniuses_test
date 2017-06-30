const express = require('express');
const router = express.Router();

const parking = require('libs/parking');


router.get('/', function (req, res) {
	res.send('Hi. i`m root API Route')
});


router.get('/parking/:id/:action', function (req, res) {
	let id = req.params.id
		,action = req.params.action;
	

	switch( action) {
		case 'status':
			parking.status( id).then( ( data) => {
				res.json({ status: 'ok', data: data});
			}).catch( ( err) => {
				res.json({ status: 'error', message: err});
			})

			break;
		case 'reservation':

			if( !req.body.place || !req.body.count) {
				res.json({ status: 'error', message: 'bad params'});
				return;
			}

			parking.reservation( id, req.body).then( ( data) => {
				res.json({ status: 'ok', data: data});
			}).catch( ( err) => {
				res.json({ status: 'error', message: err});
			})

			break;
		default:
			res.json({ status: 'error', message: `unknown method ${action}`});
	}
});

module.exports = router;
