const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");
const rjwt = require("restify-jwt-community");

const server = restify.createServer();
// Middleware
server.use(restify.plugins.bodyParser());

// Protect routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ["/auth"] }));

server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/users")(server);
  console.log(`Server started on port ${config.PORT}`);
});
