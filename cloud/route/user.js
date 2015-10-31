var Event = Parse.Object.extend("Event");

exports.getUser = function(req,res){
	var uid = req.params.id;
	res.setHeader('Content-Type', 'application/json');
	res.send({messgae : "user loading", id : uid});
}

exports.addEvent = function(req,res){
	var event = req.body;
	var eventObj = new Event();
	eventObj.set("organizerMail",event.organizerMail);
	eventObj.set("organizerNumber",event.organizerNumber);
	eventObj.set("name",event.name);
	eventObj.set("description",event.description);
	eventObj.set("City",event.City);
	eventObj.set("fullAddress",event.fullAddress);
	eventObj.set("landmark",event.landmark);
	eventObj.set("country",event.country);
	console.log(eventObj);
	eventObj.save().then(function(event){
		res.setHeader('Content-Type', 'application/json');
		res.send(event);
	},function(error){
		res.setHeader('Content-Type', 'application/json');
		res.send(error);
	});
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
	var number = req.param('mobile');
	var email = req.param('email');
	console.log(number+" "+email);
	var eventObj = new Event();
	var query = new Parse.Query("Event");
	if(typeof number !== 'undefined'){
		query.equalTo("organizerNumber",parseInt(number,10));
		console.log(number+" - "+email);
	}else if(typeof email !== 'undefined'){
		query.equalTo("organizerMail",number);
	}else{
		res.setHeader('Content-Type', 'application/json');
		res.send([]);
	}
	console.log(query);
	query.find().then(function(events){
		res.setHeader('Content-Type', 'application/json');
		res.send(events);
	});
}

exports.searchByQuery = function(req,res){
	var queryObj = req.body;
//	var queryCity = new Parse.Query("Event");
//	queryCity.equalTo("City", queryObj.city);
	var queryDesc = new Parse.Query("Event");
	queryDesc.contains("description", queryObj.query);
	var queryMark = new Parse.Query("Event");
	queryMark.contains("landmark", queryObj.query);
	var queryAddr = new Parse.Query("Event");
	queryAddr.contains("fullAddress", queryObj.query);
//	for (var key in queryObj) {
//		if (queryObj.hasOwnProperty(key)) {
//			query.contains( key, queryObj[key]); 
//		}
//	}
	var eventObj = new Event();
//	console.log(query);
	Parse.Query.or(queryDesc,queryMark,queryAddr).equalTo("City", queryObj.city).find().then(function(events){
		res.setHeader('Content-Type', 'application/json');
		res.send(events);
	});
}



