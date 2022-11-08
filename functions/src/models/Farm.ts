export class Farm {
	constructor(
		public farmName: string,
		public currency: number,
		public currencyPaid: number,
		public placedObjects: PlacedObject[],
	) {}
}

export class PlacedObject {
	constructor(
		buildingId: number,
		origin_x: number,
		origin_y: number,
		direction: number,
		worldPos_x: number,
		worldPos_y: number,
		worldPos_z: number,
		buildingData: string,
	) {}
}
