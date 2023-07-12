export function changeTitle (title) {
    title && (document.getElementsByTagName("title")[0].innerHTML = title);
}