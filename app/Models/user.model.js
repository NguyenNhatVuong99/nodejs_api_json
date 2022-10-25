const fs = require("fs")
const moment = require('moment');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
const readFilePromise = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				return reject(new Error(err))
			}
			data = JSON.parse(data);
			return resolve(data)
		})
	})
}
const User = (user) => {
	this.id = user.id;
	this.name = user.name;
	this.email = user.email;
	this.password = user.password;
	this.created_at = user.created_at;
	this.updated_at = user.updated_at;
}
User.index = (callback) => {
	readFilePromise("users.json")
		.then((data) => {
			callback(data)
		})
		.catch((error) => {
			console.log(error);
		})
}
User.login = (data, callback) => {
	let email = data.email;
	let password = data.password;
	readFilePromise("users.json")
		.then((data) => {
			let result = data.filter((item) => {
				return email == item.email
			})
			if (result.length == 0) callback({ error: true, message: "Email không đúng" })
			else {
				bcrypt.compare(password, result[0].password, function (err, isMatch) {
					if (err) {
						throw err
					} else if (!isMatch) {
						callback({ error: true, message: "Password không đúng" })
					} else {
						callback({ error: false, data })
					}
				})
			}
		})
		.catch((error) => {
			console.log(error);
		})
}
User.register = (req, callback) => {
	readFilePromise("users.json")
		.then((data) => {
			let result = data.filter((item) => {
				return req.email == item.email
			})
			if (result.length != 0) callback({ error: true, message: "Email đã tồn tại" })
			else {
				let obj = {
					id: uuidv4(),
					name: req.name,
					email: req.email,
					password: bcrypt.hashSync(req.password, 8),
					created_at: new Date(),
					updated_at: new Date()
				}
				data.push(obj)
				fs.writeFileSync("users.json", JSON.stringify(data), "utf-8", (err) => {
					if (err) throw err
				})
				callback({ error: false })
			}
		})
		.catch((error) => {
			console.log(error);
		})
}
module.exports = User