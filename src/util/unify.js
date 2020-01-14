/**
 * 当前的UID生成器
 * @type {number}
 */
let uidGenerator = 1;

/**
 * 生成下一个UID
 * @returns {number} 生成的UID
 */
function nextUid() {
    return uidGenerator++;
}

/**
 * 设置UID生成器
 * @param ig 新的UID生成器
 */
function setUidGenerator(ug) {
    uidGenerator = ug;
}

export {
    nextUid,
    setUidGenerator,
}