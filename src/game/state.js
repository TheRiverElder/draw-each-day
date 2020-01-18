import {nextUid} from "@/util/unify";

let messageList = [];

let debugCode = '';

/**
 * 判断当前是否为调试模式
 * @returns {boolean}
 */
function isDebug() {
    return debugCode === 'aff97a37-7f25-467e-8287-3b770dfe1f61';
}

/**
 * 设置调试码
 * @param code 调试码
 * @returns {boolean}
 */
function setDebugCode(code) {
    debugCode = code;
    return isDebug();
}

function showMessage(content) {
    messageList.push({
        uid:nextUid(),
        timestamp: Date.now(),
        content: content,
    });
}

export {
    messageList,
    showMessage,
    isDebug,
    setDebugCode,
};