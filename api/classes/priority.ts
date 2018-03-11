const PRIORITIES: Array<string> = [
	'High',
	'Middle',
	'Low'
];
export class Priority {
	id: number;
	name: string;

	constructor(id: number) {
		this.id = id;
		this.name = PRIORITIES[id - 1];
	}
}
