const axios = require("axios");

const tokenEndpont = "https://dev-h70joa6x.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const accessTokenFrontend = req.headers.authorization.split(" ")[1];
    req.access_token = accessTokenFrontend;
    next();
    return;
  }

  const code = req.query.code;

  if (!code) {
    res.status(401).send("Missing authorizaion code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "LJiiNAF3FXCeF6gBNjipCKylpWAcYgHk");
  params.append(
    "client_secret",
    "iG6izjVo3UzBCmmLSF2tt7geVPruaCbNiFfuJKKUp4g2DxtaMThMxPIrucIyRlu3"
  );
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/tasks");

  axios
    .post(tokenEndpont, params)
    .then((response) => {
      req.access_token = response.data.access_token;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(403).json(`Reason: ${err.message}`);
    });
};

module.exports = oAuth;
