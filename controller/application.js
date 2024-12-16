

const Application = require('../models/applications');



// Create a new application
exports.addApplication = async (req, res) => {
    try {
        const { application_no, company_name, job_title, application_date, application_status } = req.body;
        const userId = req.user.id; // From authentication middleware

        const application = await Application.create({
            application_no,
            company_name,
            job_title,
            application_date,
            application_status,
            user_id: userId,
        });

        return res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create application' });
    }
};

// Get all applications for a user
exports.getApplications = async (req, res) => {
    try {
        console.log("heloooooooooooooooo"+req.user.id);
        const userId = req.user.id; // From authentication middleware

        const applications = await Application.findAll({ where: { user_id: userId } });

        return res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params; // Application ID
        const userId = req.user.id; // From authentication middleware

        // Ensure the application belongs to the user
        const application = await Application.findOne({ where: { id, user_id: userId } });
        if (!application) {
            return res.status(404).json({ error: 'Application not found or unauthorized' });
        }

        await application.destroy();

        return res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
};
