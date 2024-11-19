const Express = require("express");
const AuthRouter = require("./controllers/Auth.controller");
const { connectToMongoDB } = require("./db");
const BookingRouter = require("./controllers/Bookings.controller");
const cors = require('cors')

const API_SERVER = Express();
// enable cors
API_SERVER.use(cors())

//parsing incoming req as json
API_SERVER.use(Express.json());

//init db connection
connectToMongoDB();

//controller inject
API_SERVER.use("/auth", AuthRouter);

API_SERVER.use("/booking", BookingRouter);

//start and listen to express to server
API_SERVER.listen(3000, "localhost", () => {
  console.log("http://localhost:3000");
});
