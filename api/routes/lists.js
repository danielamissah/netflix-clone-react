const router = require("express").Router();
const verify = require('../verifyToken');
const user = require("../models/user");
const List = require("../models/List")

//CREATE A NEW LIST
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    }
        
    else {
        res.status(403).json("You don't have permissions to do that");
    }
});


//DELET A LIST
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
        
    else {
        res.status(403).json("You don't have permissions to do that");
    }
});

//GET LISTS
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate(
                    [
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery, genre: genreQuery } }
                    ]
                );
            }
            else {
                list = await List.aggregate([
                     { $sample: { size: 10 } },
                     { $match: { type: typeQuery } }
                ])
            }
        }
        else {
            list = await List.aggregate(
                [
                    {
                        $sample: { size: 10 }
                    }]);
        }
        res.status(200).json(list);
        
    } catch (err) {
        res.status(500).json(err);
        
    }
});

module.exports = router;