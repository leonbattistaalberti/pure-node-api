// require http module
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder')

// use http to create a server
const server = http.createServer((req, res) => {
	// get pathname
	let parsedUrl = url.parse(req.url, true); // true calls the queryString method

	let path = parsedUrl.pathname;
	// clean the path
	let cleanPath = path.replace(/^\/+|\/+$/g, '');

	let queryObject = parsedUrl.query

	let headers = req.headers

	let method = req.method.toUpperCase(); //toUpperCase is used to force the method to uppercase (not necessary)

	// create a decoder that will convert the bytes of array into utf-8 string
	let decoder = new StringDecoder('utf-8')
	
	// create empty buffer for holding the incoming stream of bytes
	let buffer = ''

	// on event emmit call get the incoming data and append to buffer
	req.on('data', (data) => {
		buffer += decoder.write(data)
	});

	// if incoming data has ended or there is no data
	req.on('end', ()=> {
		buffer += decoder.end();
		// once the data has ended log the buffer and show message
		console.log(buffer)
		res.end(`Here's Johnny`);
	})


});



const port = 3000;

server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
