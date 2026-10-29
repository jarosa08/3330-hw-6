import express from "express"
const router = express.Router();

// bring over functions, arrays
import {games, isGoodNumericParam, isGoodStringParam} from "./gamesRoutes.js"

// handles /
router.route('/')
    // POST request to create a new game
    //Test: POST http://localhost:3000/api/game/
    .post((req, res)=>{
        const { title, price } = req.body;
        // validate Params
        if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
            return res.status(400).json({
                message: "Game title and price are required fields"
            });
        }
        // TODO: Create a new game and add it to the collection 
        const newGame = {
            id: Math.max(...games.map( (game) => game.id))+1,
            title: title.trim(),
            price: price
        };

        games.push(newGame);

        res.status(201).json(newGame);
    });
    
// handles /:id
router.route('/:id')
    // GET request to retrieve a single game by ID
    // Test: GET http://localhost:3000/api/game/3
    .get((req, res)=>{
        const id = Number(req.params.id);
        const game = games.find((game) => game.id === id);

        if(!game){
            res.status(400).json({message: "Game not found!"});
        }
        
        // TODO: return a JSON object with the single game
        res.status(200).json(game);

    })

    // PUT request to update an entire game
    .put((req, res) => {
        const id = Number(req.params.id);
        const game = games.find( (game) => game.id === id);

        if(!game){
            return res.status(404).json({ message: "Game not found!" });
        }
        const { title, price } = req.body;
        // validate Params
        if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
            return res.status(400).json({
                message: "Game title and price are required fields"
            });
        }

        //TODO: replace all data elements coming from the PUT request
        game.title = title.trim();
        game.price = price;
        
        res.status(200).json(game);

    })

    // PATCH request to partially update a game
    .patch((req, res) => {
        const id = Number(req.params.id);
        const game = games.find((game) => game.id === id);

        if (!game) {
            return res.status(404).json({ message: "Game not found!" });
        }

        const { title, price } = req.body;

        // Check whether the title field was provided, if so updated it!
        if (title !== undefined) { 
            if (!isGoodStringParam(title)) {
                return res.status(400).json({
                    message: "Invalid game title"
                });
            }

            // TODO: udpate the game's title
            game.title = title.trim();
            
        }

        // Check whether the price field was provided, if so updated it!
        if (price !== undefined) {
            if (!isGoodNumericParam(price)) {
                return res.status(400).json({
                    message: "Invalid game price"
                });
            }

            // TODO: udpate the game's price
            game.price = price;

        }

        res.status(200).json(game);
    })

    // DELETE request to remove a game from the collection
    .delete((req, res) => {
        const id = Number(req.params.id);
        const gameIx = games.findIndex( (game) => game.id === id);

        if(gameIx  === -1){
            return res.status(404).json({ message: "User not found" });
        }
        
        // TODO: delete the item from the collection
        games.splice(gameIx, 1);

        res.status(204).send();
    });

export default router;
