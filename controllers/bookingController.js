const Booking = require('../models/Booking');
const Warden = require('../models/Warden');

const dayToName = dayIndex => {
    // Convert day index to day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
};

const findAvailableDays = async (date, validDays) => {
    const bookedSlots = await Booking.find({ date });
    const bookedDays = bookedSlots.map(slot => {
        const slotDate = new Date(slot._doc.date);
        const options = { weekday: 'long' };
        const dayName = slotDate.toLocaleString('en-US', options);
        return dayName;
    });

    const validDays_ = validDays.map(day => dayToName(day));
    const availableDays = validDays_.filter(day => !bookedDays.includes(day));

    return availableDays;
};

const bookMeeting = async (req, res) => {
    const { wardenId, date } = req.body;

    // Additional validation for day and time
    const bookingDate = new Date(date);
    const validDays = [4, 5]; // Thursday (4) and Friday (5) are valid booking days
    const validTime = 10; // Valid booking time is 10:00 AM

    //Invalid Day
    if (!validDays.includes(bookingDate.getDay())) {
        const availableDays = await findAvailableDays(date, validDays);

        return res.status(400).json({
            message: 'Invalid booking day',
            availableDays: availableDays,
        });
    }

    //Invalid time
    if (bookingDate.getHours() !== validTime) {
        return res.status(400).json({
            message: 'Invalid booking time',
            availableTime: validTime,
        });
    }

    try {
        const exists = await Warden.findOne({ "id": wardenId });
        if (!exists) {
            return res.status(400).json({ message: 'Invalid Id' });
        } else {
            const existingBooking = await Booking.findOne({ wardenId,date });

            if (existingBooking) {
                const availableDays = await findAvailableDays(date, validDays);

                return res.status(400).json({
                    message: 'Slot is already booked',
                    availableDays: availableDays,
                });
            } else {
                const newBooking = new Booking({ wardenId, date });
                await newBooking.save();
                res.json({ message: 'Booking successful' });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    bookMeeting,
};

