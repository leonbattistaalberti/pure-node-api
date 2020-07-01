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
	res.end(`Here's Johnny`);
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
