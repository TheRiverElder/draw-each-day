import {Dice} from '../util/random.js';
import affixes from '../config/affixes.js';
import {nextUid} from "@/util/unify";
import {generatePhrase, initialize} from "@/game/pattern-processer";
import patterns from '@/assets/data/patterns.txt';


/**
 * 根据词缀的权重制作的骰子
 * @type {Dice}
 */
let diceAffix = new Dice();

/**
 * 当前玩家的资料包括其仓库以及账户余额
 * @type {{storage: [], account: number}}
 */
let profile = {
    storage: [], // 存放所有已有卡牌的仓库
    account: 1000, // 账户剩余金额
};

/**
 * 检查账户余额是否充足
 * @param amount 所需余额
 * @returns {boolean} 检查结果
 */
function checkAccount(amount) {
    return profile.account >= amount;
}

/**
 * 以给定金额为代价，进行抽卡。若成功则返回卡牌，否则返回null
 * @param payment 给定金额
 * @returns {null} 抽到的卡牌或空
 */
function draw(payment) {
    if (checkAccount(payment)) {
        profile.account -= payment;

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
        };
        profile.storage.push(card);
        return card;
    }
    return null;
}

// region 必要的初始化
Object.values(affixes).forEach(affix => diceAffix.put(affix.id, affix.weight));
initialize(patterns);
// endregion

export {
    profile,
    draw,
    checkAccount,
};