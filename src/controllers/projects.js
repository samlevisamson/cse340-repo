
import { getAllProjects } from "../models/projects.js";

const showProjectsPage =  async (req, res) => {
    try {
        const projects = await getAllProjects();

        console.log("Projects:", projects);

        res.render('projects', {
            title: 'Service Projects',
            projects
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load projects.');
    }
};

export { showProjectsPage };