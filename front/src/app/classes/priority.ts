export class Priority {
  id: number;
  name: string;
  static PRIORITYS = [
    'High',
    'Middle',
    'Low'
  ]

  constructor(id: number) {
  	this.id = id;
    this.name = Priority.PRIORITYS[id-1];
  }
}
