const convertAbsolute = (function () {
    const div = document.createElement("div");
    return function (url) {
        div.innerHTML = `<img href=${url} />`
        return div.firstElementChild;
    }
})();

export {
    convertAbsolute
}