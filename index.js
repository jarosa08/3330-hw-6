import express from "express"
import gamesRoutes from "./routes/gamesRoutes.js"
import gameRoutes from "./routes/gameRoutes.js"

const app = express();
const port = 3000;

// app.use(express.static("routes"));

app.use(express.json());

// /api/games
app.use('/api/games', gamesRoutes);

// /api/game
app.use('/api/game', gameRoutes);

app.get("/", (req, res) => {
    res.status(200).send("<h1>Request received!</h1><h2>Hello from server app</h2>");
});
app.post("/", (req, res)=>{
    res.status(200).send("3330: Post success");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});