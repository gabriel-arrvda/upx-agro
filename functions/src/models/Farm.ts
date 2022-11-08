export class Farm {
	constructor(
		public farmId: string,
		public farmName: string,
		public currency: number,
		public currencyPaid: number,
		public placedObjects: PlacedObject[],
	) {}
}

export class PlacedObject {
	constructor(
		public buildingId: number,
		public origin_x: number,
		public origin_y: number,
		public direction: number,
		public worldPos_x: number,
		public worldPos_y: number,
		public worldPos_z: number,
		public buildingData: any,
	) { }

	fromJson(){
		this.buildingData = JSON.parse(JSON.stringify(this.buildingData))
	}

	toJson(){
		this.buildingData = JSON.stringify(this.buildingData)
	}
}
