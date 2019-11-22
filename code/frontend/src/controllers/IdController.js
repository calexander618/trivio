export function generateId() {
    var today = new Date();
    var time = addLeadingZero(today.getHours()) + addLeadingZero(today.getMinutes()) + addLeadingZero(today.getSeconds());
    var rand = Math.random().toString(36).substr(2, 10);

    // NEED TO CHECK IF ID IS NOT TAKEN ALREADY

    return time + rand;
}

function addLeadingZero(n) {
    return (n < 10 ? '0' : '') + n;
}
