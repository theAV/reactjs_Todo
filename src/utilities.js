const sortArrTimeDesc = (arr, key) => {    
    return arr.sort(function (a, b) {
        var keyA = new Date(a[key]),
            keyB = new Date(b[key]);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
}
export default { sortArrTimeDesc };