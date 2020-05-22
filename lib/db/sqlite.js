const path = require('path');

const MysqlAdapter = require('./mysql');
const sqlite3 = require('sqlite3');

class SqliteAdapter extends MysqlAdapter {
	constructor(options) {
		super(options);

		console.log(path.resolve(options.location))

		const connection = this.connection = new sqlite3.Database(path.resolve(options.location));
		connection.query = function (sql, values, cb) {
			connection.run(sql, values, cb);
		}
		connection.end = function (cb) {
			connection.close(cb);
		}
	}
}


module.exports = SqliteAdapter;