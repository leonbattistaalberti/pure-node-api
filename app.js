const http = require('http');
const url = require('url');
const {
    StringDecoder
} = require('string_decoder')

// use http to create a server
const server = http.createServer((req, res) => {
    // get pathname
    let parsedUrl = url.parse(req.url, true); // true calls the queryString method

    let path = parsedUrl.pathname;
    // clean the path
    let cleanPath = path.replace(/^\/+|\/+$/g, '');

    // get query string 
    let queryObject = parsedUrl.query

    // get http headers
    let headers = req.headers

    // get http method
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
    req.on('end', () => {
        buffer += decoder.end();
        // choose handler 
        console.log(router[cleanPath])
            // if there is no handler send to handler.notFound else 
        let requestUrlHandler = typeof(router[cleanPath]) === 'undefined' ? handlers.notFound : router[cleanPath]
            // data to be sent 
        let data = {
            "path": cleanPath,
            "queryStringObject": queryObject,
            "method": method,
            "headers": headers,
            "payload": buffer
        };

        // send above data to the handler 
        requestUrlHandler(data, (statusCode, payload) => {

            // set statusCode 
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200

            // set payload
            payload = typeof(payload) == 'object' ? payload : {}

            // create payload 
            let responseString = JSON.stringify(payload)

            // write status code header to the response
            res.writeHead(statusCode);

            // send payload to the user
            res.end(responseString);

            // once the data has ended log the buffer and show message
            console.log(responseString)
        });
    });
});

const port = 3000;

// listen on port 3000
server.listen(port, () => {
    console.log(`Server started on ${port}`);
});

// request handler 

let handlers = {};


// sample route handler
handlers.sample = (data, callback) => {
    //callback http status and the payload if there is one
    callback(406, {
        'name': 'sample handler'
    })
};

// films route handler
handlers.films = (data, callback) => {
    callback(406, {
        films: ['blue velvet', 'twin peaks']
    })
}

// Not Found handler
handlers.notFound = (data, callback) => {
    callback(404)
    console.log('Not Found')
};

let router = {
    'sample': handlers.sample,
    "films": handlers.films
};