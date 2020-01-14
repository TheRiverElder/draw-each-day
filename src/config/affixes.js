export default [
    {
        id: 'normal',
        text: '',
        color: '#52a3cc',
        weight: 30,
    },
    {
        id: 'extraordinary',
        text: '超凡',
        color: '#ccbe52',
        weight: 5,
    },
    {
        id: 'dirty',
        text: '污浊',
        color: '#808080',
        weight: 15,
    },
    {
        id: 'blessed',
        text: '神祝',
        color: '#cc3547',
        weight: 10,
    },
].reduce((prev, affix) => {
    prev[affix.id] = affix;
    return prev;
}, {});