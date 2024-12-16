const Reminder = require('../models/remainder');

// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
        const { date, time, note } = req.body;

        // Get user ID from the authenticated user (from the auth middleware)
        const userId = req.user.id;

        // Create the reminder and associate it with the user
        await Reminder.create({
            date,
            time,
            note,
            sent: false,  // Default value
            userId: userId  // Associate reminder with the authenticated user
        });

        res.status(201).json({ message: 'Reminder set successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating reminder', error: error.message });
    }
};
