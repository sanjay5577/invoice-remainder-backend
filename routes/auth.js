const router = require("express").Router();
const passport = require("passport");


router.get("/login/success", (req, res) => {
	console.log("inside login success")
	if (req.user) {
        res.json({
            success: true,
            user: req.user,
            message: "User has successfully authenticated",
        });
    } else {
        res.status(401).json({
            success: false,
            message: "User is not authenticated",
        });
    }
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
