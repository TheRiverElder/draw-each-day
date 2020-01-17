
import {draw} from "@/game/core.js";
import data from "@/game/data";
import {checkAccount, saveData, canDraw} from "@/game/core";
import {showMessage, messageList} from "@/game/state";

export default {
    install(Vue) {
        Vue.prototype.$draw = draw;
        Vue.prototype.$checkAccount = checkAccount;
        Vue.prototype.$canDraw = canDraw;
        Vue.prototype.$saveData = saveData;

        Vue.prototype.$profile = data.profile;
        Vue.prototype.$settings = data.settings;

        Vue.prototype.$showMessage = showMessage;
        Vue.prototype.$messageList = messageList;
    }
}