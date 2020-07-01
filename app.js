// require http module
const http = require('http');
const url = require('url');

// use http to create a server
const server = http.createServer((req, res) => {
	// get pathname
	let parsedUrl = url.parse(req.url, true); // true calls the queryString method

	let path = parsedUrl.pathname;
	// clean the path
	let cleanPath = path.replace(/^\/+|\/+$/g, '');

	let queryObject = parsedUrl.query

	let method = req.method.toUpperCase(); //toUpperCase is used to force the method to uppercase (not necessary)
	console.log(`path: ${cleanPath}`);
	console.log(`method: ${method}`);
	//console.log(parsedUrl.query)
	res.end(`Here's Johnny`);
});



const port = 3000;

server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
