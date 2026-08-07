import db from "./db.js";

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING;
    `;

    const queryParams = [userId, projectId];

    await db.query(query, queryParams);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    await db.query(query, queryParams);
};

const isVolunteer = async (userId, projectId) => {
    const query = `
        SELECT *
        FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.location,
            sp.project_date,
            o.organization_id,
            o.name AS organization_name
        FROM volunteer v
        JOIN service_project sp
            ON v.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date;
    `;

    const queryParams = [userId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isVolunteer,
    getVolunteerProjects
};