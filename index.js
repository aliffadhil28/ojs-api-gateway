const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const cookieSession = require("cookie-session");
const helmet = require('helmet')

const app = express();
app.use(cors({ credentials: true, origin: "https://ojs-client.netlify.app" }));
app.use(express.json());
app.use(helmet({
  xFrameOptions: { action: "deny" },
  strictTransportSecurity: {
    maxAge: 86400,
  },
  xPermittedCrossDomainPolicies: {
    permittedPolicies: "none",
  },
}))
app.use(
  cookieSession({
    name: "OJ-session",
    secret: "bismillahLulusGenap2024",
    httpOnly: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res, next) => {
//   return res.status(200).json({ msg: "connected sucesfully" });
// });

app.use("/judge", proxy("http://localhost:8002"));
app.use("/auth", proxy("http://localhost:8003"));
app.use("/submition", proxy("http://localhost:8004"));
app.use("/users", proxy("http://localhost:8005"));
app.use("/problems", proxy("http://localhost:8006"));

try {
  app.listen(8001, () => {
    console.log("App is running on port 8001");
  });
} catch (error) {
  console.error(error);
}
