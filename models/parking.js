const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
/* 
	В парковке "А": У тебя есть n парковочных мест (допустим 30), 
	из них An мест (допустим 10) для грузовых машин (большие парковочные места) 
	и еще Bn мест (допустим 5) для инвалидных машин, 
	остальные стандартные места в которые может заехать инвалидка и обычная машина. 
*/

const PlacesSchema = {
	trucks: {
		type: Schema.Types.Number,
		min: 0,
		default: 0
	}, wheelchair: {
		type: Schema.Types.Number,
		min: 0,
		default: 0
	}, common: {
		type: Schema.Types.Number,
		min: 0,
		default: 0
	}
}

const ParkingSchema = {
	name: {
		type: Schema.Types.String
	},

	geo: {
		lat: {
			type: Schema.Types.Number
		}, lon: {
			type: Schema.Types.Number
		}
	},

	places: PlacesSchema,

	occupied_places: PlacesSchema
}

const Parking = new Schema(ParkingSchema);

Parking.methods.checkFreePlace = function ( place, count) {
	

	let freePlace = this.places[ place] - this.occupied_places[ place]

	if( freePlace >= count) {
		let result = {
			check: true
		}

		result[ place] = count;
	}

	if( place == 'wheelchair' && this.checkFreePlace( 'common', count)) {
		
		let result = {
			status: null
		};	
		place = 'common';
	}
	return check;
}

Parking.methods.setOccupied = function ( place, count = 1) {
	return new Promise( (res, rej) => {

		if( typeof this.places[ place] == 'undefined'){
			return rej( 'bad place');
		}
		
		if( !this.checkFreePlace( place, count)) {
			return rej( 'no place');
		}

		let id = this.id;

		let update = { $inc: {} }
		update.$inc[ `occupied_places.${place}`] = count;

		model.findOneAndUpdate({_id: id}, update).exec()
			.then( ( doc) => {

				//if( doc.occupied_places[ place] > doc.occupied[ place]){
					
				//}
				res( { doc: doc, place})
			});
		
	});
};

let model = mongoose.model('Parking', Parking);
module.exports = model;