import express from 'express';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, showUsersPage, requireRole, } from "./controllers/users.js";
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm  } from "./controllers/categories.js";
import { testErrorPage } from './controllers/errors.js';
import { addVolunteer, removeVolunteer } from "./controllers/volunteer.js";

const router = express.Router();

router.get('/', showHomePage);

// Route to Dashboard
router.get('/dashboard', requireLogin, showDashboard);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Route for organization page
router.get('/organizations', showOrganizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization details page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to edit organization form submission
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.get('/projects', showProjectsPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

// Volunteer routes
router.post('/project/:id/volunteer', requireLogin, addVolunteer);

router.post('/project/:id/remove-volunteer', requireLogin, removeVolunteer);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route for editing projects
router.get("/edit-project/:id", requireRole('admin'), showEditProjectForm);
router.post("/edit-project/:id", requireRole('admin'), projectValidation,processEditProjectForm);

router.get('/categories', showCategoriesPage);

// Route for category details page
router.get("/category/:id", showCategoryDetailsPage);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Route for new category page
router.get("/new-category", requireRole('admin'), showNewCategoryForm);

// Route to handle new category form submission
router.post("/new-category", requireRole('admin'), categoryValidation, processNewCategoryForm);

// Route for edit category page
router.get("/edit-category/:id", requireRole('admin'), showEditCategoryForm);

// Route to handle edit category form submission
router.post("/edit-category/:id", requireRole('admin'), categoryValidation, processEditCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for Users Page
router.get('/users', requireRole('admin'), showUsersPage);


export default router;