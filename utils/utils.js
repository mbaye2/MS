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
