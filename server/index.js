import app from "./app.js";
const port = process.env.PORT || 8082;

const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

