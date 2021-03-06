const PORT = process.env.PORT || 5000; //PORT ENV given by Heroku
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
path = require("path"); //new 10/18

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
          "Error: Failure to approve admin, jwt authorized, but not admin user",
        user: req.user,
        roles: req.user["http://www.nateapp.comroles"]
      });
    }
  }
};
//app.all("/", approveAdmin);
app.use("/api/visitors", VisitorRouter);
app.post("/api/posts", checkJwt, approveAdmin, PostRouter);
app.patch("/api/posts/:id", checkJwt, approveAdmin, PostRouter); //need the :id for this route to get picked up
app.delete("/api/posts/:id", checkJwt, approveAdmin, PostRouter);
app.use("/api/posts", PostRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

app.listen(PORT, err => {
  console.log(err || `listening on PORT ${PORT}`);
});
