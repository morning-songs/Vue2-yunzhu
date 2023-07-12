// 判断是否为图片类型
export function isImageType (type) {
    switch (type) {
        case "image/gif" :
        case "image/jpg" :
        case "image/jpeg" :
        case "image/webp" :
        case "image/png" :
            return true;
        default :
            return false;
    }
}
// 判断是否为md类型
export function isMdType (name) {
    return /\.md$/.test(name) ? true : false;
}