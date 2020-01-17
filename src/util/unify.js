import data from "@/game/data";


/**
 * 生成下一个UID
 * @returns {number} 生成的UID
 */
function nextUid() {
    return data.other.uidGenerator++;
}

/**
 * 计算给定毫秒数对应的天数
 * @param time 毫秒数
 * @returns {number}
 */
function dayOf(time) {
    return Math.floor(time / (1000 * 60 * 60 * 24));
}

/**
 * 获取今天天数
 * @returns {number}
 */
function getToday() {
    return dayOf(Date.now());
}

/**
 * 判断是否再今天之前（以自然天计算）
 * @param time 给出时间
 * returns {boolean}
 */
function beforeToday(time) {
    return dayOf(time) < getToday();
}

export {
    nextUid,
    getToday,
    beforeToday,
    dayOf,
}