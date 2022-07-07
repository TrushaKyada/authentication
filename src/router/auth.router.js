const auth = require("../middleware/auth");
const route = require("express").Router();

const {
    authRegistration,
    authLogin,
    authLogout,
    forgotPassword  
} = require("../controller/auth.ctrl");

route.post("/register",authRegistration);
route.post("/login",authLogin);
route.get("/logout",auth,authLogout);
route.get("/forgotPassword/:id",forgotPassword);

module.exports = route