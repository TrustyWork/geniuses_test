const ModelParking = require('models/parking');

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

module.exports.status = ( id) => {
	return new Promise( ( res, rej) => {
		
		ModelParking.findById(id).then( (doc) => {

			let result = calcStatus( doc);
			res( result);
		}).catch( ( err) => {
			rej( `Can't find id ${id}`);
		});
	})
}

module.exports.reservation = ( id, params) => {
	return new Promise( ( res, rej) => {
		
		ModelParking.findById(id).then( (doc) => {
					
			let place = params.place,
				count = params.count;

			return doc.setOccupied( place, count).then( ( doc, place) =>{
			console.log()
				let result = calcStatus( doc);
				res( result, place);
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