const express = require('express');
const router = express.Router();

const ModelParking = require('models/parking');

router.get('/', function (req, res) {
	res.send('Hi. i`m root API Route')
});


router.post('/parking/:id/:action', function (req, res) {
	let id = req.params.id
		,action = req.params.action;

	switch( action){
		case 'status':
		case 'reservation':
			if( !req.body.place || !req.body.count) {
				return res.json({ status: 'error', message: 'bad params'});
			}
				ModelParking.setOccupied( place, 1);
			}
		default:
			return res.json({ status: 'error', message: `unknown method ${action}`});
	}

	res.json({});
});

module.exports = router;
