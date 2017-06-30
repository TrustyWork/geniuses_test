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
	// _id will be created by Mongo

	name: {
		type: Schema.Types.String
	},

	geo: {
		lat: {
			
		}, lon: {
			type: Schema.Types.String
		}
	},

	places: PlacesSchema,

	occupied_places: PlacesSchema
}

const Parking = new Schema(ParkingSchema);

//id -> user
Parking.statics.setOccupied = function () {
	
};

module.exports = mongoose.model('Parking', User);