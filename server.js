const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Request = require('request');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let yelpData;

function yelpRequest(requestedLocation) {
	return new Promise((resolve, reject) => {
		let location = requestedLocation;
		let token = 'Bearer (API_KEY)';
		let url = `https://api.yelp.com/v3/businesses/search?categories=ramen&location=${location}&radius=16009`;
		Request({url: url, headers: { 'Authorization': token}}, function (error, response, body) {
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			if (error !== null) {
				reject(console.log(error))
			} else {
				resolve(body);
			}
		})
	})
}

app.post('/', async (req, res) => {
	const yelpDataFinished = await yelpRequest(req.body.location);
	res.send(yelpDataFinished);
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})
