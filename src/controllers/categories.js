import { body, validationResult } from "express-validator";

import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js"

const categoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Category name must be between 3 and 100 characters.")
];

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

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    res.render("category", {
        title: category.name,
        category,
        projects
    });
};


const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {

    res.render("new-category", {
        title: "Create New Category"
    });
};
const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });
        return res.redirect("/new-category");
    }

    const { name } = req.body;
    const categoryId = await createCategory(name);
    req.flash("success", "Category created successfully!");
    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    res.render("edit-category", {
        title: "Edit Category",
        category
    });
};

const processEditCategoryForm = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash("error", error.msg);
        });

        return res.redirect(`/edit-category/${req.params.id}`);
    }

    const categoryId = req.params.id;
    const { name } = req.body;
    await updateCategory(categoryId, name);

    req.flash("success", "Category updated successfully!");
    res.redirect(`/category/${categoryId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, 
    showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm  };