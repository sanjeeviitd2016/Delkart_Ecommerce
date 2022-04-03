//token creation and save token in cookie
const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken();
  const expireDate = process.env.EXPIRE_DATE || 5; //env
  //options for cookies
  const options = {
    expires: new Date(Date.now() + expireDate * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  }); 
};

module.exports = sendToken;
