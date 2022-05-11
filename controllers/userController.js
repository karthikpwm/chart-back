const sha256 = require('js-sha256')
const jwt = require('jwt-then')

exports.register = async (req, res) => {
  const {name, email, password} = req.body;
  
  // const emailRegx = /@gmail.com/;
  
  // if(!emailRegx.test(email)) throw "Email is not supported form your domain"
  if(password.length < 6) throw "Password must be atleast 6 characters long"
  const userExits = await User.findOne({
    email
  })

  if(userExits) throw "User Email Already Exit";

  const user = new User({name, email, password: sha256(password + process.env.SALT)})

  await user.save();

  res.json({
    message: `User [${ name }] register successfully`
  })
};

exports.login = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT)
  })

  if(!user) throw "Email and Password did not match"

  const token = await jwt.sign({id : user.id}, process.env.SECRET)
  res.json({
    message : "User logged successfully",
    token
  })
} 