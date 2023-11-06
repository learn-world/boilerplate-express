let express = require('express');
let app = express();
let bodyParser = require('body-parser');

absolutePath = __dirname + '/views/index.html'

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});


app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  const message = "Hello json";
  const { MESSAGE_STYLE } = process.env;

  const responseObject = {
    message: MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message,
    messageStyle: MESSAGE_STYLE
  };

  res.json(responseObject);
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString(); 
  next();
}, function(req, res) {
  res.send({time :req.time});
});

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word })
})

app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({
    "name": `${firstName} ${lastName}`
  });
})


app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;

































 module.exports = app;
