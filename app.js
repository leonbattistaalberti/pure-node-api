// require http module
const http = require('http');

// use http to create a server
const server = http.createServer((req, res) => {
	res.end(`Here's Johnny`);
});

const port = 3000;

server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
