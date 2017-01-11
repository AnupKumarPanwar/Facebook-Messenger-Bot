'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()


app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('Hello World! I\'m Anup Kumar Panwar.' )
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'MyBot') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})



//privacy policy
app.get('/policy/', function (req, res) {
	res.send('This App does not share user details with any 3rd party')
})


// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Generic') {
				sendGenericMessage(sender)
				continue
			}
			if (text === '@notes database normalization') {
				sendGenericMessagedbnormalize(sender)
				continue
			}
			if (text === '@notes sql') {
				sendGenericMessagesql(sender)
				continue
			}
			if (text === '@syllabus') {
				sendGenericMessagesyllabus(sender)
				continue
			}
			if (text === '@assignment') {
				sendGenericMessageassignment(sender)
				continue
			}
			
			if (text === '@testme') {
				sendGenericMessagetestme(sender)
				continue
			}
			
			// sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			sendTextMessage(sender, text)
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback.payload)
			sendTextMessage(sender, text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAAImdkZBRFdUBAJjdXCttPEhPlV9qi9bQFckWKAnIGHv7es0ZBOVIQZCrw9ZCPYcqQbj4x5JZAsnxKevC9XOL1MeZCnZCIzZBRkMqrH4o5m44ZAkl3Rpmuvnc98ZCdNtypcKl67KevUBZCEd7eGzLgTcExU6Akksgi7pC8VS6fmm5xctwZDZD"

function sendTextMessage(sender, text) {
	
	var API_msg='Hi';
	

	let receiveedData = { text:text }
	var messageData={ text:text }

	
	if (true) {messageData.text=API_msg}
	else if (receiveedData.text.toLowerCase().indexOf("whatsup")!=-1) {messageData.text="Nothing much! You tell"}
	else if (receiveedData.text.toLowerCase().indexOf("how r u")!=-1) {messageData.text="I\'m good. What about you?"}
	else if (receiveedData.text.toLowerCase().indexOf("hi")!=-1) {messageData.text="Hello"}
	else if (receiveedData.text.toLowerCase().indexOf("how are you")!=-1) {messageData.text="I\'m good. What about you?"}
	else if (receiveedData.text.toLowerCase().indexOf("hello")!=-1) {messageData.text="Hi"}
	else if (receiveedData.text.toLowerCase().indexOf("help")!=-1) {messageData.text="Try the following commands : -\n 1. @assignment\n2. @attendence <roll no>\n3. @result <roll no>\n4. @book <topic name>\n5. @contact <teacher name>\n6. @date <event>\n7. @notes <topic>\n8. @syllabus\n9. @testme "}
	else if (receiveedData.text.toLowerCase().indexOf("@book database")!=-1) {messageData.text="Database System Concepts - Henry Korth, S.Sudarshan and Abraham Silberschatz."}
	else if (receiveedData.text.toLowerCase().indexOf("@book microprocessor")!=-1) {messageData.text="The 8051 Microcontroller and Embedded Systems - Muhammad Ali Mazidi"}
	else if (receiveedData.text.toLowerCase().indexOf("@book discrete math")!=-1) {messageData.text="Kenneth Rosen book titled Discrete Mathematics and Its Applications."}
	else if (receiveedData.text.toLowerCase().indexOf("@book java")!=-1) {messageData.text="Java The Complete Reference, 8th Edition Herbert Schildt"}
	else if (receiveedData.text.toLowerCase().indexOf("@book c++")!=-1) {messageData.text="Object Oriented Programming with C++ - Balagurusamy"}
	else if (receiveedData.text.toLowerCase().indexOf("@book physics")!=-1) {messageData.text="Concepts of Modern Physics - HC Verma"}
	else if (receiveedData.text.toLowerCase().indexOf("@book chemistry")!=-1) {messageData.text="Modern Chemistry - Pradeep"}
	else if (receiveedData.text.toLowerCase().indexOf("@result")!=-1) {var x=Math.random() * (10 - 5) + 5; messageData.text=x.toFixed(2)+" CGPA"}
	else if (receiveedData.text.toLowerCase().indexOf("@contact")!=-1) {var x=Math.floor(Math.random() * (9999999999 - 7811111111) + 7811111111); messageData.text="Call him/her @ " + x}
	else if (receiveedData.text.toLowerCase().indexOf("@attendence")!=-1) {var x=Math.random() * (2 - 0) + 0; if(x<=1){messageData.text="Your attendence is marked as PRESENT for today"} else{messageData.text="Your attendence is marked as ABSENT for today"}}
	else if (receiveedData.text.toLowerCase().indexOf("@date next exam")!=-1) {messageData.text="20 October 2016, 10:00 am - Web Technologies"}
	


	// else {messageData.text="Chal bay"}
	request("http://api.program-o.com/v2/chatbot/?bot_id=6&say="+text+"&convo_id=anupkumarpanwar&format=json", function(error, response, body) {
			// API_msg=body.botsay;
			messageData.text=JSON.parse(body).botsay;
		  console.log(JSON.parse(body).botsay);
		  request({
		  	url: 'https://graph.facebook.com/v2.6/me/messages',
		  	qs: {access_token:token},
		  	method: 'POST',
		  	json: {
		  		recipient: {id:sender},
		  		message: messageData,
		  	}
		  }, function(error, response, body) {
		  	if (error) {
		  		console.log('Error sending messages: ', error)
		  	} else if (response.body.error) {
		  		console.log('Error: ', response.body.error)
		  	}
		  })
		})



}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}]
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}]
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}








function sendGenericMessagedbnormalize(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First Normal Form",
					"image_url": "http://images.slideplayer.com/7/1649387/slides/slide_11.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://images.slideplayer.com/7/1649387/slides/slide_11.jpg",
						"title": "Download"
					}]
				}, {
					"title": "Second Normal Form",
					"image_url": "http://image.slidesharecdn.com/normal-forms4308/95/normal-forms-30-728.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://image.slidesharecdn.com/normal-forms4308/95/normal-forms-30-728.jpg",
						"title": "Download"
					}]
				}, {
					"title": "Third Normal Form",
					"image_url": "http://image.slidesharecdn.com/relationalexercises-121113135642-phpapp02/95/relational-database-examples-7-638.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://image.slidesharecdn.com/relationalexercises-121113135642-phpapp02/95/relational-database-examples-7-638.jpg",
						"title": "Download"
					}]
				}, {
					"title": "BCNF Normal Form",
					"image_url": "http://images.slideplayer.com/7/1649387/slides/slide_19.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://images.slideplayer.com/7/1649387/slides/slide_19.jpg",
						"title": "Download"
					}]
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}














function sendGenericMessagesql(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "SQL Cheat Sheet",
					"image_url": "http://www.careerarm.com/wp-content/uploads/2015/11/SQL-server-cheatsheet.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://www.careerarm.com/wp-content/uploads/2015/11/SQL-server-cheatsheet.jpg",
						"title": "Download"
					}]
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}










function sendGenericMessagesyllabus(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Database syllabus",
					"image_url": "http://images.slideplayer.com/39/11065963/slides/slide_2.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://images.slideplayer.com/39/11065963/slides/slide_2.jpg",
						"title": "Download"
					}]
				},

					{
					"title": "Microprocessor syllabus",
					"image_url": "http://images.slideplayer.com/11/3310853/slides/slide_3.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://images.slideplayer.com/11/3310853/slides/slide_3.jpg",
						"title": "Download"
					}]
				},


					{
					"title": "Mathematics syllabus",
					"image_url": "http://studychacha.com/img/b/First-SEM-BE-VTU-Syllabus-1.jpg",
					"buttons": [{
						"type": "web_url",
						"url": "http://studychacha.com/img/b/First-SEM-BE-VTU-Syllabus-1.jpg",
						"title": "Download"
					}]
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}












function sendGenericMessageassignment(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Mathematics assignment",
					"subtitle": "To be submitted by 18th October 2016",
					"image_url": "http://iitvidya.com/wp-content/uploads/2014/12/assi-301.png",
					"buttons": [{
						"type": "web_url",
						"url": "http://iitvidya.com/wp-content/uploads/2014/12/assi-301.png",
						"title": "Download"
					}]
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}




















function sendGenericMessagetestme(sender) {





	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Physics",
					"subtitle": "When a gas is turned into a liquid, the process is called ?",
					"buttons": [ {
						"type": "postback",
						"title": "condensation",
						"payload": "Correct Answer",
					},
					{
						"type": "postback",
						"title": "evaporation",
						"payload": "Wrong Answer...Corrrect Answer is condensation",
					},
					{
						"type": "postback",
						"title": "sublimation",
						"payload": "Wrong Answer...Corrrect Answer is condensation",
					}
					]
				}

				 ]
			}
		}
	}



	var x=Math.floor(Math.random() * (6 - 1) + 1)

	if (x>=1) {


	 messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Physics",
					"subtitle": "When a gas is turned into a liquid, the process is called ?",
					"buttons": [ {
						"type": "postback",
						"title": "condensation",
						"payload": "Correct Answer",
					},
					{
						"type": "postback",
						"title": "evaporation",
						"payload": "Wrong Answer...Corrrect Answer is condensation",
					},
					{
						"type": "postback",
						"title": "sublimation",
						"payload": "Wrong Answer...Corrrect Answer is condensation",
					}
					]
				}

				 ]
			}
		}
	}
}


	if (x>=2) {


		 messageData = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [
					{
						"title": "Chemistry",
						"subtitle": "Which of the following elements is a metal? ",
						"buttons": [ {
							"type": "postback",
							"title": "S",
							"payload": "Wrong Answer...Corrrect Answer is Ga",
						},
						{
							"type": "postback",
							"title": "I",
							"payload": "Wrong Answer...Corrrect Answer is Ga",
						},
						{
							"type": "postback",
							"title": "Ga",
							"payload": "Correct Answer",
						}
						]
					}

					 ]
				}
			}
		}

	}






	if (x>=3) {



		 messageData = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [

					{
						"title": "Biology",
						"subtitle": "Pollination by birds is called? ",
						"buttons": [ 
						{
							"type": "postback",
							"title": "ornithophily",
							"payload": "Correct Answer",
						},
						{
							"type": "postback",
							"title": "entomophily",
							"payload": "Wrong Answer...Corrrect Answer is ornithophily",
						},
						{
							"type": "postback",
							"title": "anemophily",
							"payload": "Wrong Answer...Corrrect Answer is ornithophily",
						}
						]
					}

					 ]
				}
			
		}
	}

}











	if (x>=4) {



		 messageData = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [

					{
						"title": "Physics",
						"subtitle": "The SI unit of charge is __________? ",
						"buttons": [ 
						{
							"type": "postback",
							"title": "Coulomb",
							"payload": "Correct Answer",
						},
						{
							"type": "postback",
							"title": "Ampere",
							"payload": "Wrong Answer...Corrrect Answer is Coulomb",
						},
						{
							"type": "postback",
							"title": "Volt",
							"payload": "Wrong Answer...Corrrect Answer is Coulomb",
						}
						]
					}

					 ]
				}
			
		}
	}

}







	if (x>=5) {



		 messageData = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [

					{
						"title": "Biology",
						"subtitle": "Deficiency of Vitamin-A results in __________? ",
						"buttons": [ 
						{
							"type": "postback",
							"title": "night blindness",
							"payload": "Correct Answer",
						},
						{
							"type": "postback",
							"title": "rickets",
							"payload": "Wrong Answer...Corrrect Answer is night blindness",
						},
						{
							"type": "postback",
							"title": "scurvy",
							"payload": "Wrong Answer...Corrrect Answer is night blindness",
						}
						]
					}

					 ]
				}
			
		}
	}

}












	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}













// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
