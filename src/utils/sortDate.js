//对数组根据日期进行排序
export function sortDates(data) {
    return data.sort(function (a, b) {
        return a.time < b.time ? 1 : -1
    })
}