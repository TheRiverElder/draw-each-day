let messageList = [];

function showMessage(content) {
    messageList.push({timestamp: Date.now(), content: content});
}

export {
    messageList,
    showMessage,
};