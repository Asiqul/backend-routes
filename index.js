const http = require("http");

const reqListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200
      response.statusMessage = "OK"
      return response.end("Hai, ini adalah Homepage");
    }
    response.statusCode = 405
    response.statusMessage = "Method Not Allowed!"
    return response.end(`Halaman tidak dapat diakses dengan ${method} request`);
  }
  
  else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200
      response.statusMessage = "OK"
      return response.end("Halo, ini adalah halaman about");
    } 
    
    else if (method === "POST") {
      let body = [];
      response.statusCode = 200
      response.statusMessage = "OK"
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`Halo, ${name}! ini adalah halaman about`);
      });
    } 
    
    else {
      response.statusCode = 405
      response.statusMessage = "Method Not Allowed!"
      return response.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  }
  
  else {
    response.statusCode = 404
    response.statusMessage = "Not Found!"
    return response.end("Halaman tidak ditemukan!");

  }
};

const host = "localhost";
const port = 3200;
const server = http.createServer(reqListener);

server.listen(port, host, () => {
  console.log(`Server berjalan di ${host} dengan port ${port}`);
});
