export default [
    {
        id: 'normal',
        text: '',
        color: '#cccccc',
        weight: 30,
    },
    {
        id: 'fine',
        text: '卓越',
        color: '#52a3cc',
        weight: 1,
    },
    {
        id: 'extraordinary',
        text: '超凡',
        color: '#ccbe52',
        weight: 5,
    },
    {
        id: 'blessed',
        text: '神祝',
        color: '#800000',
        weight: 15,
    },
    {
        id: 'chaos',
        text: '混沌',
        color: '#99718d',
        weight: 1,
    },
    {
        id: 'dirty',
        text: '污秽',
        color: '#9fcc5f',
        weight: 1,
    },
    {
        id: 'wise',
        text: '智慧之',
        color: '#881bcc',
        weight: 1,
    },
    {
        id: 'hermit',
        text: '隐者',
        color: '#cc3547',
        weight: 10,
    },
    {
        id: 'wind',
        text: '疾风',
        color: '#cc9b68',
        weight: 1,
    },
    {
        id: 'king',
        text: '大王',
        color: '#04cc2c',
        weight: 1,
    },
    {
        id: 'voodoo',
        text: '巫毒',
        color: '#6f6099',
        weight: 1,
    },
    {
        id: 'fairy',
        text: '仙子',
        color: '#cc41ae',
        weight: 1,
    },
    {
        id: 'fallen',
        text: '堕落的',
        color: '#595959',
        weight: 1,
    },
    {
        id: 'demigod',
        text: '半神',
        color: '#ccc383',
        weight: 1,
    },
    {
        id: 'heaven',
        text: '天子',
        color: '#ccbf06',
        weight: 1,
    },
    {
        id: 'week',
        text: '弱小',
        color: '#6eccad',
        weight: 1,
    },
    {
        id: 'shaman',
        text: '萨满',
        color: '#64cc5e',
        weight: 1,
    },
    {
        id: 'strong',
        text: '强健',
        color: '#cc6600',
        weight: 1,
    },
    {
        id: 'great',
        text: '伟大',
        color: '#2369cc',
        weight: 1,
    },
].reduce((prev, affix) => {
    prev[affix.id] = affix;
    return prev;
}, {});