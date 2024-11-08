const { beverage } = require("../models/beverage");
const fs = require("fs").promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), "utf8");
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function editbeverage(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const image = req.body.image;
        const price = req.body.price;
        const category = req.body.category;
        const description = req.body.description;
        const rating = req.body.rating;
        const quantity = req.body.quantity;

        const allbeverages = await readJSON("utils/beverages.json");

        var modified = false;

        for (var i = 0; i < allbeverages.length; i++) {
            var cucurrBeverage = allbeverages[i];
            if (cucurrBeverage.id == id) {
                allbeverages[i].name = name;
                allbeverages[i].image = image;
                allbeverages[i].price = price;
                allbeverages[i].category = category;
                allbeverages[i].description = description;
                allbeverages[i].rating = rating;
                allbeverages[i].quantity = quantity;

                modified = true;
            }
        }

        if (modified) {
            await fs.writeFile(
                "utils/beverages.json",
                JSON.stringify(allbeverages),
                "utf8"
            );
            return res
                .status(201)
                .json({ message: "Beverage updated successfully" });
        } else {
            return res
                .status(404)
                .json({ message: "Error occurred,unable to modify!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    editbeverage,
};
