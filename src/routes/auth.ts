import express from "express";
import passport from 'passport'

const router = express.Router();


const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
          cookies: req.cookies,
          session: req.sessionID
        // accessToken: req.cookies
      });
    }
  });
  
// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//       success: false,
//       message: "failure",
//     });
// });
  
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});


//Đường dẫn kích hoạt đăng nhập facebook
router.get('/facebook',passport.authenticate('facebook'));

//Trả về phương thức get passport lọc hết data từ fb trả về
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect: CLIENT_URL,
        failureRedirect: 'http://localhost:3000/login' 
    }),
    // facebookAuth
);


router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "http://localhost:3000/login",
  })
);

router.get('/home', (req,res,next) => {
    res.send(req.user)
})
export default router;