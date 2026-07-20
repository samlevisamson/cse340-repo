import { getAllCategories } from "../models/categories.js";

const showCategoriesPage =  async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to retrieve categories.");
    }
};

export { showCategoriesPage };