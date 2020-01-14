import {pickOne} from "@/util/random";

/**
 * 命名空间
 * 其下包含token(string)与其对应pattern集(Array)
 * 而pattern为一串连续的phrase生成器，phrase生成器定义为：
 * () => string
 */
let namespace = {};

// region 正则表达式
// 名字与参数的正则
let tokenReg = /(\[\s*([0-9a-zA-Z_]+)\s*])|(\$(\s*[0-9a-zA-Z_]+\s*)\$)/g;
// 定义token的正则
let tokenDeclareReg = /^#\s*([0-9a-zA-Z_]+)\s*/g;
// 空字符串或注释的正则
let emptyStringReg = /^\s*(;.*)?$/;
// endregion

/**
 * 编译模板
 * @param pattern 原始模板字符串
 * @returns {[]} 编译后的模板
 */
function compilePattern(pattern) {
    let last = 0;
    let compiledPattern = [];
    for (let result of pattern.matchAll(tokenReg)) {
        if (last < result.index) {
            let prevStr = pattern.substring(last, result.index);
            compiledPattern.push(() => prevStr);
        }
        last = result.index + result[0].length;
        let token = result[2];
        let name = result[4];
        if (token) {
            compiledPattern.push(() => generatePhrase(token));
        } else if (name) {
            compiledPattern.push(args => args[name]);
        }
    }
    if (last < pattern.length) {
        let lastPhrase = pattern.substring(last);
        compiledPattern.push(() => lastPhrase);
    }
    return compiledPattern;
}

/**
 * 在读取到数据后对其进行编译
 * @param data 读取到的数据
 */
// eslint-disable-next-line no-unused-vars
function compile(data) {
    let currentToken = null;
    let lines = data.split(/\r?\n/g);
    for (let line of lines) {
        let result = tokenDeclareReg.exec(line);
        if (result) {
            currentToken = result[1];
            namespace[currentToken] = [];
        } else if (emptyStringReg.test(line)) {
            continue;
        } else {
            let pattern = compilePattern(line);
            namespace[currentToken].push(pattern);
        }
    }
}

/**
 * 初始化命名空间
 * 从配置文件导入pattern
 * 并将其解析、填充到namespace中
 */
function initialize(src) {
    namespace = {};
    compile(src)
}

/**
 * 根据token生成phrase
 * 从namespace中选取token对应的pattern集
 * 再从pattern集中随机选取一个
 * 由此pattern与args生成phrase
 * @param token 指定token
 * @param args 给定的参数，包含各种的参数
 * @returns {string}
 */
function generatePhrase(token, args) {
    let patterns = namespace[token];
    let pattern = pickOne(patterns);
    let phrase = '';
    for (let part of pattern) {
        phrase = phrase.concat(part.call(namespace, args));
    }
    return phrase;
}

export {
    initialize,
    generatePhrase,
}