let User = require("../models/user.model")
exports.index = (req, res) => {
	User.index((response) => {
		res.send({ data: response })
	})
}
exports.login =  (req, res) => {
	User.login(req.body, (response) => {
		if (!response.error) {
			res.send({ status: 200, message: "Đăng nhập thành công" })
		} else {
			res.send({ status: 400, message: response.message })
		}
	})
}
exports.register = (req, res) => {
	User.register(req.body, (response) => {
		if (!response.error) {
			res.send({ status: 200, message: "Đăng ký thành công" })
		} else {
			res.send({ status: 400, message: response.message })
		}
	})
}