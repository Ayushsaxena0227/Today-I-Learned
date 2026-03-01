// email , pass, rate limitng
//loginapi
const app = require("express");
const loginAttempt = [];
app.use("/login", (req, res)=>{
    const{username, password} = req.body;
    const now = Date.now();
    if(loginAttempt[username]){
        loginAttempt = {count:0}
    }
    const UserData = loginAttempt[username];
    // reset if more than 1 minute has been passed
    if(now- UserData.firstAttempt>60000){
        UserData.count = 0;
        UserData.firstAttempt = now;
    }

    if(UserData.count>=5){
        return res.status(429).json({
            message: "Too many requst, Try again after 1 minute";
        })
    }

})