/* For Test */
const ModelParking = require('models/parking');
const parking = require('libs/parking');

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
			trucks: 10, 
			wheelchair: 5, 
			common: 15
		}
	});
	model.save();
});


let id = '5955fa05926810170487c5b2';
function reservation( params) {
	parking.reservation( id, params).then( ( data, place) => {
		console.log( 'reservation', { status: 'ok', data: data, place: place});
	}).catch( ( err) => {
		console.log( 'reservation', { status: 'error', message: err});
	})
}

function status() {
	parking.status( id).then( ( data) => {
		console.log( 'status', { status: 'ok', data: data});
	}).catch( ( err) => {
		console.log( 'status', { status: 'error', message: err});
	})
}

status();
reservation({ place: 'wheelchair', count: 10});