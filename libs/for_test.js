/* For Test */
const ModelParking = require('models/parking');

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