const PORT = process.env.PORT || 3001;
bodyParser = require("body-parser");
express = require("express");
cors = require("cors");
helmet = require("helmet");
morgan = require("morgan");
mongoose = require("mongoose");
dotenv = require("dotenv");
PostRouter = require("./Routes/PostRoutes.js");
VisitorRouter = require("./Routes/VisitorRoutes.js");
checkJwt = require("./Helpers/checkJWT.js");

dotenv.config();

const app = express();

MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .catch(err =>
    console.log(`error connecting to DB: ${err}, MONGODB_URI: ${MONGODB_URI}`)
  );

let db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});

//middleware
app.use(helmet()); //configure headers for security
app.use(bodyParser.json()); //change request data to JSON
app.use(cors()); //Accept all requests
app.use(morgan("combined")); //log http requests...
let approveAdmin = (req, res, next) => {
  if (!req.user) {
    res.send({
      message: "ERROR: Failure to approve admin, no request in user",
      err: 401
    });
  } else {
    console.log("roles", req.user["http://www.nateapp.comroles"]);
    if (req.user["http://www.nateapp.comroles"].includes("admin")) {
      // res.send({ message: "success", user: req.user, roles: "admin" });
      console.log("Admin privileges granted for request");
      // continue
      next();
    } else {
      console.log("ACCESS DENIED");
      res.send({
        message:
          "Error: Failere to approve admin, jwt authorized, but not admin user",
        user: req.user,
        roles: req.user["http://www.nateapp.comroles"]
      });
    }
  }
};
//app.all("/", approveAdmin);
app.use("/api/visitors", VisitorRouter);
app.post("/api/posts", checkJwt, approveAdmin, PostRouter);
app.patch("/api/posts", checkJwt, approveAdmin, PostRouter);
app.delete("/api/posts", checkJwt, approveAdmin, PostRouter);
app.use("/api/posts", PostRouter);

app.listen(PORT, err => {
  console.log(err || `listening on PORT ${PORT}`);
});
