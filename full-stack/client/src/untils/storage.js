// 封装操作localStorage本地缓存的各种方法

// 存入本地
function setStorage (key, value) {
    // 存入的属性及值

    // 需要存储的是引用类型，建议转换为JSON字符串再存储
    if (value && typeof value === "object") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

// 获取本地某项信息
function getStorage(key) {
    // 获取某项信息
    let data = window.localStorage.getItem(key);

    // 获取时，可以转换为js的数据类型
    try {
        // 可以转换为js数据类型的，先转换再返回。
        return JSON.parse(data);
    } catch (error) {
        // 不能转换类型的，直接返回原数据。
        return data;
    }
    
}

// 删除本地某项信息
function removeStorage(key) {
    // 删除本地某项信息
    window.localStorage.removeItem(key);
}

// 删除本地所有信息
function removeAllStorage(key) {
    // 删除本地所有信息
    window.localStorage.clear(key);
}

export {
    setStorage,
    getStorage,
    removeStorage,
    removeAllStorage
}