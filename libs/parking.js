const ModelParking = require('models/parking');

const parkings = {}

ModelParking.find( {}).then( ( docs) => {

	for( let idx in docs){
		let doc = docs[idx];

		let id = doc.id;
		parkings[id] = doc;
	}
});

const calcStatus = ( doc) => {
	let result = {}

	let _doc = doc.toObject();
	for( var vehclass in _doc.places){
		result[ vehclass] = {
			max: _doc.places[vehclass],
			occupied: _doc.occupied_places[vehclass]
		}
	}
	
	return result;
}

module.exports.newpark = ( params) => {

	var model = new ModelParking( params);
	model.save().then( ( doc) => {
		let id = doc.id;
		parkings[id] = doc;
	});
}

module.exports.status = ( id) => {
	
	if( typeof parkings[id] == 'undefined'){
		return false;
	}

	return calcStatus( parkings[id]);
}

module.exports.reservation = ( id, params) => {
	return new Promise( ( res, rej) => {
		
		ModelParking.findById(id).then( (doc) => {
					
			let place = params.place,
				count = params.count;

			return doc.setOccupied( place, count).then( ( data) => {
				let doc = data.doc,
					result = calcStatus( doc);

				res( { result: result, place: data.place});
			}).catch( ( err) =>{
				rej(err);
			});

		}).catch( ( err) => {

			if( err.name == 'CastError' && err.path == '_id') {
				rej( `Can't find id ${id}`);
			} else {
				console.warn( err);
				rej( 'Unknown error');
			}
		});
	});
}