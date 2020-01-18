import {Dice} from '@/util/random.js';
import affixes from '@/config/affixes.js';
import {nextUid} from "@/util/unify.js";
import patterns from '@/assets/data/patterns.txt';
import data from "@/game/data.js";
import {randInt} from "@/util/random.js";
import {beforeToday} from "@/util/unify.js";
import {showMessage} from "@/game/state.js";
import {PatternManager} from "@/game/pattern-manager.js";
import {isDebug} from "@/game/state";

/**
 * 故事的模板生成器
 * @type {PatternManager}
 */
let patternManager = new PatternManager();

/**
 * 检查账户余额是否充足
 * @param amount 所需余额
 * @returns {boolean} 检查结果
 */
function checkAccount(amount) {
    return data.profile.account >= amount;
}

/**
 * 以给定金额为代价，进行抽卡。若成功则返回卡牌，否则返回null
 * @returns {string|null} 抽卡中发生的错误，若无则返回null
 */
function draw() {
    let payment = data.settings.cost;
    if (checkAccount(payment) && canDraw()) {
        let now = Date.now();

        data.profile.account -= payment;
        data.profile.lastDraw = now;

        let diceAffix = makeAffixDice(Math.min(payment / (60 * (2 - data.profile.luck)), 2));

        let affixId = diceAffix.roll();
        let affix = affixes[affixId];
        let name = patternManager.generate('role');

        let card = {
            uid: nextUid(),
            affixId: affix.id,
            name: name,
            story: patternManager.generate('story', {role: name}),
            address: patternManager.generate('site', {role: name}),
            artifact: patternManager.generate('object', {role: name}),
            color: affix.color,
            timestamp: now,
        };
        data.profile.storage.push(card);
        showMessage('抽到新卡：' + affix.text + card.name);
        saveData();
        return null;
    }
    return '余额不足或今日次数用尽';
}

/**
 * 本地存档键
 * @type {string}
 */
const LOCAL_STORAGE_KEY = 'draw-each-day';

/**
 * 从localStorage中读取存档，键为LOCAL_STORAGE_KEY的值
 */
function loadData() {
    let json = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (json) {
        let version = data.version;
        Object.assign(data, json);
        data.version = version;
    }
    showMessage('载入完毕');
}

/**
 * 将存档存在localStorage，键为LOCAL_STORAGE_KEY的值
 */
function saveData() {
    let json = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, json);
    showMessage('存档完毕');
}

/**
 * 判断当前时间是否可以进行新的抽卡
 * @returns {boolean}
 */
function canDraw() {
    return isDebug() || beforeToday(data.profile.lastDraw);
}

/**
 * 处理新一天的逻辑，包括：
 * 更新幸运值
 * 给予新的金额
 * 更新今日抽卡标记
 */
function onNewDay() {
    let luck = Math.random() + 0.5;
    data.profile.luck = luck;
    let inc = 20 + randInt(Math.floor(80 * luck));
    data.profile.account += inc;

    showMessage('新的一天到了呢，幸运值更新了哟~');
    showMessage('入账：' + inc);
}

/**
 * 初始化游戏
 */
function initializeGame() {
    patternManager.compile(patterns);
    loadData();

    if (beforeToday(data.profile.lastLogin)) {
        onNewDay();
    }

    data.profile.lastLogin = Date.now();
    saveData();
}

/**
 * 制作词缀骰子，其中涉及玩家幸运值
 * @param fix 修正系数
 * @returns {Dice} 制作的骰子
 */
function makeAffixDice(fix) {
    let dice = new Dice();
    Object.values(affixes).forEach(affix => dice.put(affix.id, affix.weight / (data.profile.luck + fix)));
    return dice;
}

// region 必要的初始化
initializeGame();
// endregion

export {
    draw,
    checkAccount,
    loadData,
    saveData,
    canDraw,
    patternManager,
    LOCAL_STORAGE_KEY
};