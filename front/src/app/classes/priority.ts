export class Priority {
	id: number;
	name: string;
	PRIORITIES: Array<string> = [
		'High',
		'Middle',
		'Low'
	];

	constructor(id: number) {
		this.id = id;
		this.name = this.PRIORITIES[id - 1];
	}
}
