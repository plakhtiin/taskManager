import {DataBaseConnection} from './db';

import {App} from './App';

const port = process.env.PORT || 3000;
const dataBaseConection: DataBaseConnection = new DataBaseConnection();
export class Index {
	app: App = new App();
	constructor() {
		this.app.express.listen(port, (err) => {
			if (err) {
				return console.log(err);
			}
			return console.log(`server is listening on ${port}`);
		});
		dataBaseConection.connectToServer((success, err) => {
			if (err) {
				console.log(err);
			}
			else if (success) {
				console.log('Successful connection to DB');
			}
		});
	}
}
export default new Index();
