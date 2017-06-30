const express = require('express');
const router = express.Router();

const ModelParking = require('models/parking');

router.get('/', function (req, res) {
	res.send('Hi. i`m root API Route')
});


router.get('/parking/:id/:action', function (req, res) {
	let id = req.params.id
		,action = req.params.action;
	
	ModelParking.findById(id)
		.then( (doc) => {

			if( action == 'status'){
				return;
			}

			if( action == 'reservation'){
				if( !req.body.place || !req.body.count) {
					res.json({ status: 'error', message: 'bad params'});
					return;
				}
					
				let place = req.body.place,
					count = req.body.count;

				return ModelParking.setOccupied( place, count)
					.then( (place) =>{

					})
					.catch( ( err) =>{
						res.json({ status: 'error', message: err});
					})
			}

			res.json({ status: 'error', message: `unknown method ${action}`});
		}).catch( ( err) => {
			//res.json({ status: 'error', message: 'unknown error'});
			return res.json({ status: 'error', message: `Can't find id ${id}`});
		})
});


/* For Test */
ModelParking.findOne( { name: 'test A'}).then( ( doc) => {

	if( doc){
		return;
	}

	var model = new ModelParking({ 
		name: 'test A',

		geo: {
			lat: '65.325592', lon: '-17.753906'
		},

		places: {
			trucks: 10
		}, wheelchair: {
			type: 5
		}, common: {
			type: 15
		}
	});
	model.save();
});

module.exports = router;
