
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// app.get("/organizations", async (req, res) => {
//     try {
//         console.log("Organizations route hit");

//         const organizations = await getAllOrganizations();

//         console.log(organizations);

//         res.render("organizations", {
//             title: "Organizations",
//             organizations
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message);
//     }
// });


const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };