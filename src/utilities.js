const monthArray = ["Jan", "Feb", "March", "april" , "june", "july", "august", "sept", "oct", "nov","Dec"];

const sortArrTimeDesc = (arr, key) => {
    return arr.sort(function (a, b) {
        var keyA = new Date(a[key]),
            keyB = new Date(b[key]);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
}

const createdTimeStamp = () => {
    let date = new Date(),
        timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return timestamp;
}
const dateTimeFormate = (date_string) => {
    let convertedDateTime = date_string.getDate() + " " +
        monthArray[date_string.getMonth()] + " " +  
        date_string.getFullYear() + ", " +
        ((date_string.getHours()>9)?date_string.getHours():("0"+date_string.getHours())) + ":" + 
        ((date_string.getMinutes()>9)?date_string.getMinutes():("0"+date_string.getMinutes()));
        return convertedDateTime;
}
export default {
    sortArrTimeDesc,
    createdTimeStamp,
    dateTimeFormate
};