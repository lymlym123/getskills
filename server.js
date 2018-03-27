var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 9660));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
	next();
});

var USER_INFO = path.join(__dirname, '/public/infor.json');

app.get('/api/rJson', function(req, res) {
	//读取goods.json文件
	fs.readFile(USER_INFO, function(err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		}
		var username = JSON.parse(data);
		res.json(username);
		//通过req.query.xxx来提取前端页面给我们发生的get请求的参数
		//if (checkUser(counters, req.body.user) === true) {

		//} else {
		// res.json({ret: false});
		//}
	});
});
app.post('/api/wJson', function(req, res) {
	console.log(req.body);
	var flag = true;
	fs.readFile(USER_INFO, function(err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		} else {
			var username = JSON.parse(data);
			for(var i = 0; i < username.length; i++) {
				console.log(req.body);
				if(username[i].NAME === req.body.NAME) {
					flag = false;
					//res.json({ret: false, msg: 'imgId exsited'});
					var newName = {
						NAME: req.body.NAME,
						PASSWORD: req.body.PASSWORD,
						TELE: req.body.TELE,
						ADDR: req.body.ADDR
					};
					username.splice(i, 1, newName);
					//console.log("username:"+username);
					//username.push(newName);
					break;
				}
			}
			if(flag) {
				var newName = {
					NAME: req.body.NAME,
					PASSWORD: req.body.PASSWORD,
					TELE: req.body.TELE,
					ADDR: req.body.ADDR
				};
				username.push(newName);
			}
		}

		fs.writeFile(USER_INFO, JSON.stringify(username, null, 4), function(err) {
			// console.log(JSON.stringify(comments));
			if(err) {
				console.error(err);
				process.exit(1);
			}
			res.json({
				ret: true
			});
		});
	});
});

app.post('/api/delJson', function(req, res) {
	fs.readFile(USER_INFO, function(err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		} else {
			var username = JSON.parse(data);
			for(var i = 0; i < username.length; i++) {
				console.log("username[i].NAME:" + username[i].NAME);
				console.log("req.body.NAME:" + req.body.NAME);
				if(username[i].NAME === req.body.NAME) {

					username.splice(i, 1);
					break;
				}
			}
		}

		fs.writeFile(USER_INFO, JSON.stringify(username, null, 4), function(err) {
			// console.log(JSON.stringify(comments));
			if(err) {
				console.error(err);
				process.exit(1);
			}
			res.json({
				ret: true
			});
		});
	})
})
app.post('/api/ooJson', function(req, res) {
	fs.readFile(USER_INFO, function(err, data) {
		var flag = true;
		if(err) {
			console.error(err);
			process.exit(1);
		} else {
			console.log(req.body.NAME)
			var user = JSON.parse(data);
			var scont = new Array();
			for(var i = 0; i < user.length; i++) {
				if(user[i].NAME.indexOf(req.body.NAME) > -1) {
					flag = false;
					scont.push(user[i]);
					console.log("scont" + scont);
					JSON.stringify(scont, null, 4)
				}
			}
			res.send(scont);
			if(flag) {
				console.log("找不到信息")
				res.send("找不到信息");
			}
		}
	})
})
app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/index.html');
});