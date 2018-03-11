import {Priority} from './priority';

export class Task {
	_id: any;
	userId: string;
	name: string;
	startDate: Date;
	finishDate: Date;
	description: string;
	priority: Priority;
	completed: boolean = false;

	constructor(id: string, values: Object = {}, priority: number) {
		Object.assign(this, values);
		this.priority = new Priority(priority);
		this.userId = id;
	}
}
