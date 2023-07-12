export function getDate (date) {
    let dateArr = date.toDateString().split(" ");
    switch (dateArr[1]) {
        case "Jan":
            return `${dateArr[3]}-1-${dateArr[2]}`;
        case "Feb":
            return `${dateArr[3]}-2-${dateArr[2]}`;
        case "Mar":
            return `${dateArr[3]}-3-${dateArr[2]}`;
        case "Apr":
            return `${dateArr[3]}-4-${dateArr[2]}`;
        case "May":
            return `${dateArr[3]}-5-${dateArr[2]}`;
        case "Jun":
            return `${dateArr[3]}-6-${dateArr[2]}`;
        case "Jul":
            return `${dateArr[3]}-7-${dateArr[2]}`;
        case "Aug":
            return `${dateArr[3]}-8-${dateArr[2]}`;
        case "Sep":
            return `${dateArr[3]}-9-${dateArr[2]}`;
        case "Oct":
            return `${dateArr[3]}-10-${dateArr[2]}`;
        case "Nov":
            return `${dateArr[3]}-11-${dateArr[2]}`;
        case "Dec":
            return `${dateArr[3]}-12-${dateArr[2]}`;
        default :
            return `${dateArr[3]}-${dateArr[1]}-${dateArr[2]}`;
    }
}