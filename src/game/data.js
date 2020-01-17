
let data = {
    // 当前玩家的资料包括其仓库以及账户余额
    profile: {
        storage: [], // 存放所有已有卡牌的仓库
        account: 0, // 账户剩余金额
        luck: 0.5, // 幸运值，介于0到1之间，影响抽卡
        lastDraw: 0, // 最后一次抽卡时间
        lastLogin: 0, // 上次登陆时间
    },
    // 当前设备上的设置
    settings: {
        darkMode: false, // 黑夜模式
        autoDraw: false, // 每次启动的时候，自动抽卡
        cost: 100, // 每次抽卡的消耗
    },
    other: {
        uidGenerator: 1,
    },
    version: 2,
};

export default data;