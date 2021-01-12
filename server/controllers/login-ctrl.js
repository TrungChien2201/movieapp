const Login = require("../models/login-model");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
CreateLogin = (req, res) => {
  const body = req.body;
  console.log(`body`, req.body);
  if (!body) {
    return res.status(400).json({
      status: error,
      message: "Username an password is not null",
    });
  }
  const data = new Login(body);

  if (!data) {
    return res.status(400).json({ status: "Error", message: error });
  }
  console.log(`run here`, data);
  Login.findOne({username: req.body.username}, (err, login) => {
    if (err) {
      return res
        .status(201)
        .json({ status: "ERROR", message: "Login fail", error: err });
    }
    console.log(`run here`, login);
    if (login.username === body.username && login.password === body.password) {
      const accessToken = jwt.sign(
        { username: body.username, password: body.password },
        accessTokenSecret
      );
      return res
        .status(200)
        .json({ status: "Success", message: "Login success", accessToken });
    }
    return res.status(401).json({ status: "Error", message: "Login fail" });
  });
};

Register = (req, res) => {
  const body = req.body;
  console.log(`body`, body);
  if (!body) {
    return res
      .status(400)
      .json({ status: "Error", message: "Body is not null" });
  }
  const login = new Login(body);
  if (!login) {
    return res.status(400).json({ status: "Error", message: error });
  }
  login
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: login._id,
        message: "Register success",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Register fail!",
      });
    });
};

ForgotPassword = (req,res) => {
    Login.findOne({username: req.body.username})
        .then(user => {
            if (!user) return res.status(401).json({message: 'The email address ' + req.body.username + ' is not associated with any account. Double-check your email address and try again.'});

            //Generate and set password reset token
            user.generatePasswordReset();

            // Save the updated user object
            user.save()
                .then(user => {
                    // send email
                    let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
                    const mailOptions = {
                        to: user.username,
                        from: "vutrungchuong123@gmail.com",
                        subject: "Password change request",
                        text: `Hi ${user.username} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    };

                    sgMail.send(mailOptions, (error, result) => {
                        if (error) return res.status(500).json({message: error.message});

                        res.status(200).json({message: 'A reset email has been sent to ' + user.username + '.'});
                    });
                })
                .catch(err => res.status(500).json({message: err.message}));
        })
        .catch(err => res.status(500).json({message: err.message}));
}
module.exports = { CreateLogin, Register,ForgotPassword };
