// address、hobby、phobby转值用
export function arrayToString(array) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
        str += array[i];
        if (i != array.length - 1) {
            str += ",";
        }
    }
    return str;
}