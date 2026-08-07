import * as volunteerModel from "../models/volunteer.js";

const addVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await volunteerModel.addVolunteer(userId, projectId);

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const removeVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await volunteerModel.removeVolunteer(userId, projectId);

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export {
    addVolunteer,
    removeVolunteer
};