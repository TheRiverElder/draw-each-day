import {Dice} from '@/util/random.js';
import affixes from '@/config/affixes.js';
import {nextUid} from "@/util/unify.js";
import {generatePhrase, initialize} from "@/game/pattern-processer.js";
import patterns from '@/assets/data/patterns.txt';
import data from "@/game/data.js";
import {randInt} from "@/util/random";
import {beforeToday} from "@/util/unify";
import {showMessage} from "@/game/state";


/**
 * 根据词缀的权重制作的骰子
 * @type {Dice}
 */
let diceAffix = new Dice();

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
        data.profile.account -= payment;
        let now = Date.now();
        data.profile.lastDraw = now;

        let affixId = diceAffix.roll();
        let affix = affixes[affixId];
        let name = generatePhrase('role');

        let card = {
            uid: nextUid(),
            affixId: affix.id,
            name: name,
            story: generatePhrase('story', {role: name}),
            address: generatePhrase('site', {role: name}),
            artifact: generatePhrase('object', {role: name}),
            color: affix.color,
            timestamp: now,
        };
        data.profile.storage.push(card);
        showMessage('抽到新卡：' + affix.text + card.name);
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
    return beforeToday(data.profile.lastDraw);
}

/**
 * 处理新一天的逻辑，包括：
 * 更新幸运值
 * 给予新的金额
 * 升级词缀骰子
 * 更新今日抽卡标记
 */
function onNewDay() {
    let luck = Math.random();
    data.profile.luck = luck;
    let inc = 20 + randInt(Math.floor(80 * (luck + 0.5)));
    data.profile.account += inc;
    makeAffixDice();
    saveData();

    showMessage('新的一天到了呢，幸运值更新了哟~');
    showMessage('入账：' + inc);
}

/**
 * 初始化游戏
 */
function initializeGame() {
    initialize(patterns);
    loadData();

    if (beforeToday(data.profile.lastLogin)) {
        onNewDay();
    }
    makeAffixDice();

    data.profile.lastLogin = Date.now();
}

/**
 * 制作词缀骰子，其中涉及玩家幸运值
 */
function makeAffixDice() {
    let computedLuck = data.profile.luck + 0.5;
    diceAffix.clear();
    Object.values(affixes).forEach(affix => diceAffix.put(affix.id, affix.weight / computedLuck));
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
};