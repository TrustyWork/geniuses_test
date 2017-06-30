const ModelParking = require('models/parking');


module.exports.status = ( id) => {
	return new Promise( ( res, rej) => {
		
		ModelParking.findById(id).then( (doc) => {

			let result = {}
			for( var vehclass in doc.places){
				result[ vehclass] = {
					max: doc.places[vehclass],
					occupied: doc.occupied_places[vehclass]
				}
			}
			
			res( result);
		
		}).catch( ( err) => {
			rej( `Can't find id ${id}`);
		});
	})
}

module.exports.reservation = ( id, params) => {
	return new Promise( ( res, rej) => {
		
		ModelParking.findById(id).then( (doc) => {
					
				let place = req.body.place,
					count = req.body.count;

				return ModelParking.setOccupied( place, count)
					.then( (place) =>{

					})
					.catch( ( err) =>{
						res.json({ status: 'error', message: err});
					})
			}
		}).catch( ( err) => {
			rej( `Can't find id ${id}`);
		});
	})
}