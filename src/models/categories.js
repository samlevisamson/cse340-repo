import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title
        FROM service_project sp
        JOIN project_category pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export { getAllCategories, getCategoryDetails, getProjectsByCategoryId };