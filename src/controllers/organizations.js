
import { getAllOrganizations } from "../models/organizations.js";

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

// Export any controller functions
export { showOrganizationsPage };