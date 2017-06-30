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
		ddefault: 0 
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

Parking.statics.checkFreePlace = function ( place, count) {
	let check =  this.places[ place] - this.places.occupied_places[ place] < count;
	return check;
}

Parking.statics.setOccupied = function ( place, count = 1) {
	return new Promise( (res, rej) => {
		
		if( typeof this.places[ place] == 'undefined'){
			return rej( 'bad place');
		}
		
		if( !this.checkFreePlace( place, count)) {
			if( place == 'wheelchair' && this.checkFreePlace( 'common', count)) {
				place = 'common';
			}

			return rej( 'no place');
		}

		let selector = `occupied_places.${place}`;
		this.update( {} , { $inc: { selector: count } } );
		res( place)
	});
};

module.exports = mongoose.model('Parking', Parking);