const { beverage } = require('../models/beverage');
const fs = require('fs').promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
async function addbeverage(req, res) {
    try {
        const name = req.body.name;
        const image = req.body.image;
        const price = req.body.price;
        const category = req.body.category;
        const description = req.body.description;
        const rating = req.body.rating;
        const quality = req.body.quality;
        //check for price rating and quality to be number
        if (isNaN(price)) {
            return res.status(400).json({ message: "Price must be a number." });
        } else if (isNaN(rating)) {
            return res.status(400).json({ message: "Rating must be a number." });
        } else if (rating < 1 || rating > 10) {
            return res.status(400).json({ message: "Rating must be between 1 and 10." });//check for values of rating from 1-10
        } else if (isNaN(quality)) {
            return res.status(400).json({ message: "Quality must be a number." });
        }else{
            const newbeverage = new beverage(name,image,price,category, description,rating,quality);
            const updatedbeverages = await writeJSON(newbeverage,'utils/beverages.json');
            return res.status(201).json(updatedbeverages);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, addbeverage
};