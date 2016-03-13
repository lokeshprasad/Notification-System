var publisherConstant = require('../constants/publisher');
var subscriberConstant = require('../constants/subscriber');

function openNotificationTailableCursor(socket, collection){
// open a tailable cursor
	collection.find({}, {tailable:true, awaitdata:true, numberOfRetries:-1}).sort({ $natural: 1 }).each(function(err, doc) {
		console.log('doc', doc);
		if (doc && doc.type != undefined && doc.type == 'message') {
			if ( socket.group == undefined ) {
				socket.emit("message", doc);
			} else if (doc.group == socket.group) {
				socket.emit("message", doc);
			}
		}
	});
}

exports.openNotificationTailableCursor  =openNotificationTailableCursor;

// Random entries to notification
function insertRandomEntries(collection){
	var messageText = publisherConstant.messages[Math.floor(Math.random() * publisherConstant.messages.length)];
	var group = subscriberConstant.groups[Math.floor(Math.random() * subscriberConstant.groups.length)];
	collection.insert({type : 'message', text: messageText, group : group}, function(err, success){
		if(success){
			console.log('Inserted Random Record');
		}
	});
}

exports.insertRandomEntries = insertRandomEntries;