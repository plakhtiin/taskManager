export class Post {
  id: number = null;
  userId: number;
  title: string;
  body: string;
  
  constructor(values: Object = {}, id?: number) {
    Object.assign(this, values);
    if(id) { this.id = id; }
  }
}
  