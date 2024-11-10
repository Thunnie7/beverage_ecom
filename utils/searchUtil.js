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

async function searchbeverage(req, res) {
    try {
        // Fetch all resources
        const allResources = await readJSON("utils/beverages.json");

        // Get the search query from URL parameters (e.g., /search-resources?name=water)
        const searchQuery = req.query.name ? req.query.name.toLowerCase() : '';

        // Filter resources by name (case-insensitive)
        const filteredResources = allResources.filter(resource =>
            resource.name.toLowerCase().includes(searchQuery)
        );

        return res.status(200).json(filteredResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    readJSON,
    writeJSON,
    searchbeverage,
};
