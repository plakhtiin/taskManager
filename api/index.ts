import {DataBaseConection} from './db';

import app from './App';

const port = process.env.PORT || 3000;
const dataBaseConection: DataBaseConection = new DataBaseConection();

app.listen(port, (err) => {
	if (err) {
		return console.log(err);
	}
	return console.log(`server is listening on ${port}`);
});
dataBaseConection.connectToServer((success, err) => {
	if (err) {
		console.log(err);
	}
	else if(success) {
		console.log('Successful connection to DB');
	}
});
