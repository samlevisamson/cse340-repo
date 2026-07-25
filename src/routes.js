import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from "./controllers/categories.js";
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization details page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/projects', showProjectsPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

// Route for category details page
router.get("/category/:id", showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;