import {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getCategoriesByProjectId
} from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    console.log("Projects:", projects);

    res.render("projects", {
        title: "Upcoming Service Projects",
        projects
    });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);

    res.render("project", {
        title: "Project Details",
        project,
        categories
    });
};

export {
    showProjectsPage,
    showProjectDetailsPage
};