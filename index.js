var liveServer = require("live-server");
var plantuml = require('node-plantuml');
plantuml.useNailgun(); // Activate the usage of Nailgun 

const UML_SOURCE = 'index.uml';
const APP_PORT = 8181;

function outputPlantumlImage(req, res, next) {
  if(req.url=='/index.png')
  {
    res.setHeader('Content-Type', 'image/png');
    var gen = plantuml.generate(UML_SOURCE, {format: 'png'});
    gen.out.pipe(res);
  }else if(req.url=='/index.svg')
  {
    res.setHeader('Content-Type', 'image/svg+xml');
    var gen = plantuml.generate(UML_SOURCE, {format: 'svg'});
    gen.out.pipe(res.socket);
  }else{
    next();
  }
}

var params = {
    port: APP_PORT, // Set the server port. Defaults to 8080. 
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. 
    open: true, // When false, it won't load your browser by default. 
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore 
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec. 
    mount: [['/components', './node_modules']], // Mount a directory to a route. 
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots 
    middleware: [outputPlantumlImage] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack 
};

console.info(`http://0.0.0.0:${APP_PORT}/index.html`);
console.info(`http://0.0.0.0:${APP_PORT}/index.uml`);
console.info(`http://0.0.0.0:${APP_PORT}/index.png`);
console.info(`http://0.0.0.0:${APP_PORT}/index.svg`);

liveServer.start(params);
