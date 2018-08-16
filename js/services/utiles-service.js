function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    var isStored = localStorage.getItem(key)
    return isStored? JSON.parse(isStored) : null
}

function makeid(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getTimestampDate() {
    var timestamp = new Date().getTime();
    return timestamp;
}

function timestampToOrigin(timestamp) {
    var todate = new Date(timestamp).getDate();
    var tomonth = new Date(timestamp).getMonth() + 1;
    var toyear = new Date(timestamp).getFullYear();
    var original_date = tomonth + '/' + todate + '/' + toyear;
    return original_date;
}


export default {
    makeid,
    saveToStorage,
    loadFromStorage,
    getTimestampDate,
    timestampToOrigin,

}
