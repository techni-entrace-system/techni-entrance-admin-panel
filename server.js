import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the build/dist folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build", "client")));

// Always return index.html for SPA routing (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
