import {pickOne} from "@/util/random";

/**
 * 模板管理器，存放所有模板
 */
class PatternManager {


    constructor() {
        this.namespace = {};
    }

    /**
     * 在读取到数据后对其进行编译，而后得到模板管理器
     * @param data 读取到的数据
     */
    compile(data) {
        let currentToken = null;
        let lines = data.split(lineSplitReg);
        for (let line of lines) {
            let result = tokenDeclareReg.exec(line);
            if (result) {
                currentToken = result[1];
                this.namespace[currentToken] = [];
            } else if (emptyStringReg.test(line)) {
                continue;
            } else {
                let pattern = PatternManager.compilePattern(line);
                let patterns = this.namespace[currentToken];
                if (patterns) {
                    patterns.push(pattern);
                }
            }
        }
    }

    /**
     * 编译一行模板
     * @param line 原始模板字符串
     * @returns {[]} 编译后的模板
     */
    static compilePattern(line) {
        let last = 0;
        let compiledPattern = [];
        let result = null;
        while ((result = tokenReg.exec(line)) !== null) {
            if (last < result.index) {
                let prevStr = line.substring(last, result.index);
                compiledPattern.push(() => prevStr);
            }
            last = result.index + result[0].length;
            let token = result[2];
            let name = result[4];
            if (token) {
                compiledPattern.push(manager => manager.generate(token));
            } else if (name) {
                compiledPattern.push((manager, args) => args[name]);
            }
        }
        if (last < line.length) {
            let lastPhrase = line.substring(last);
            compiledPattern.push(() => lastPhrase);
        }
        return compiledPattern;
    }

    /**
     * 清空所有模板
     */
    clear() {
        this.namespace = {};
    }

    /**
     * 将模板放入相应集合
     * @param token 模板名
     * @param pattern 模板
     */
    put(token, ...newPatterns) {
        let patterns = this.namespace[token];
        if (!patterns) {
            patterns = [];
            this.namespace[token] = patterns;
        }
        patterns.push(...newPatterns);
    }

    /**
     * 根据模板名给出模板集合
     * @param token 模板名
     * @returns {*}
     */
    get(token) {
        return this.namespace[token];
    }

    /**
     * 根据token生成phrase
     * 从namespace中选取token对应的pattern集
     * 再从pattern集中随机选取一个pattern
     * 由此pattern与args生成phrase
     * @param token 指定token
     * @param args 给定的参数，包含各种的参数
     * @returns {string}
     */
    generate(token, args) {
        let patterns = this.namespace[token];
        let pattern = pickOne(patterns);
        let phrase = '';
        for (let part of pattern) {
            phrase = phrase.concat(part.call(this, this, args));
        }
        return phrase;
    }

}

// region 正则表达式
// 分割行的正则
let lineSplitReg = /\\n|\r?\n/g;
// 名字与参数的正则
let tokenReg = /(\[\s*([0-9a-zA-Z_]+)\s*])|(\$(\s*[0-9a-zA-Z_]+\s*)\$)/g;
// 定义token的正则
let tokenDeclareReg = /^#\s*([0-9a-zA-Z_]+)\s*/g;
// 空字符串或注释的正则
let emptyStringReg = /^\s*(;.*)?$/;
// endregion


export {
    PatternManager,
}