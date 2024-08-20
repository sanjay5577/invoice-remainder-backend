require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "https://invoice-remainder-frontend.vercel.app",
		credentials: true,
	})
);

console.log("hi")

app.get('/', (req, res) => {
	res.send('Hello World!');
  });

app.use("/auth", authRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));