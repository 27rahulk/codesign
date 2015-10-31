var Event = Parse.Object.extend("Event");

exports.getUser = function(req,res){
	var uid = req.params.id;
	res.setHeader('Content-Type', 'application/json');
	res.send({messgae : "user loading", id : uid});
}

exports.addEvent = function(req,res){
	var event = req.body
	var eventObj = new Event();
	event.save(event).then(function(event){
		res.setHeader('Content-Type', 'application/json');
		res.send(event);
	})
}

exports.getEvent = function(req,res){
	var objectId = req.id
	var eventObj = new Event();
	query.get(objectId).then(function(event){
		return event;
	});
}

exports.getEventById = function(req,res){
	var objectId = req.id
	var eventObj = new Event();
	var query = new Parse.Query("Event");
	query.get(objectId).then(function(event){
		return event;
	});
}

exports.getEventsByUser = function(req,res){
	var number = req.param.mobile;
	var email = req.param.mobile;
	var eventObj = new Event();
	var query = new Parse.Query("Event");
	if(typeof number !== 'undefined'){
		query.equalTo("organizerNumber",number);
	}else if(typeof email !== 'undefined'){
		query.equalTo("organizerMail",number);
	}
	query.find().then(function(events){
		res.setHeader('Content-Type', 'application/json');
		res.send(events);
	});
}


