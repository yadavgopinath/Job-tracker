const cron = require('node-cron');
const Reminder = require('../models/remainder'); // Import Reminder model
const sendEmail = require('../util/sendEmail'); // Import email utility

// Cron job to check and send reminders
cron.schedule('*/2 * * * * *', async () => {
    try {
        console.log('Cron job executed at:', new Date().toISOString());
        const now = new Date();

        // Find reminders scheduled for now and not yet sent
        const reminders = await Reminder.findAll({
            where: {
                sent: false,
                date: now.toISOString().split('T')[0], // Today's date
                time: now.toTimeString().split(' ')[0].slice(0, 5), // Current time (HH:MM)
            },
        });

        for (const reminder of reminders) {
            const user = await reminder.getUser(); // Assumes association with User model
            await sendEmail(user.email, 'Reminder Notification', reminder.note);

            // Mark the reminder as sent
            reminder.sent = true;
            await reminder.save();
        }

        console.log(`Checked reminders at ${now}`);
    } catch (error) {
        console.error('Error running reminder cron job:', error);
    }
});

module.exports = cron;
