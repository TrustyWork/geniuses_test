const ModelParking = require('models/parking');

module.exports.reservation = mongoose.model('User', User);
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