module.exports.capitalize = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports.catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

module.exports.getMonthFromNumber = (number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const index = parseInt(number, 10) - 1;
    return months[index]
}

module.exports.findObjectByName = (dataList, name) => {
    return dataList.find(item => item.name === name);
}

module.exports.generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

module.exports.tagEvent = (event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    const currentDateString = currentDate.toDateString();
    const eventDateString = eventDate.toDateString();
    const diffInTime = eventDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0);
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    if (eventDate < currentDate) {
        return { ...event, tag: "Dépassé" };
    } else if (diffInDays === 1) {
        return { ...event, tag: "Demain" };
    } else if (eventDateString === currentDateString) {
        return { ...event, tag: "Aujourd'hui" };
    } else {
        return { ...event, tag: "" };
    }
};
