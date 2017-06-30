/* For Test */
const ModelParking = require('models/parking');
const parking = require('libs/parking');

//ModelParking.findOne( { name: 'test A'}).then( ( doc) => {
{ 
		name: 'test A',

		geo: {
			lat: '65.325592', lon: '-17.753906'
		},

		places: {
			trucks: 10, 
			wheelchair: 5, 
			common: 15
		}
	}

let id = '5955fa05926810170487c5b2';
function reservation( params) {
	parking.reservation( id, params).then( ( data) => {
		console.log( 'reservation', { status: 'ok', data1: data.result.common, data2: data.result.wheelchair, data3: data.result.trucks, place: data.place}, "\n\n\n");
	}).catch( ( err) => {
		console.log( 'reservation', { status: 'error', message: err}, "\n\n\n");
	})
}

function status() {
	console.log( 'status', parking.status( id));
}

status();
//reservation({ place: 'wheelchair', count: 3});