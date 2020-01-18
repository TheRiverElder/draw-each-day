<template>
    <div class="settings">
        <table class="settings-table">
            <tr>
                <td>夜间模式（未实现）</td>
                <td><input type="checkbox" v-model="settings.darkMode"/></td>
            </tr>
            <tr>
                <td>自动抽卡（未实现）</td>
                <td><input type="checkbox" v-model="settings.autoDraw"/></td>
            </tr>
            <tr>
                <td>消耗（注意界限）</td>
                <td><input type="number" width="4em" v-model.number="settings.cost"/></td>
            </tr>
            <tr v-if="debug">
                <td>调试：账户</td>
                <td><input type="number" width="4em" min="0" v-model.number="profile.account"/></td>
            </tr>
            <tr v-if="debug">
                <td>调试：幸运值</td>
                <td><input type="number" width="4em" min="0.5" max="1.5" step="0.05" v-model.number="profile.luck"/></td>
            </tr>
        </table>
        <button @click="saveData">手动保存</button>
        <button @click="putNewPatterns">手动 添加/覆盖 模板</button>
        <button @click="overwritePatterns">手动 重写 模板</button>
        <button @click="clearSavedData">清除存档（<p class="important">慎点</p>）</button>
        <button v-if="debug" @click="addMessage">调试：添加消息</button>
        <p class="author" @click="clickAuthor">作者：百度贴吧@江氏之子</p>
    </div>
</template>

<script>
    import {LOCAL_STORAGE_KEY, patternManager} from "@/game/core";
    import {isDebug, setDebugCode} from "@/game/state";

    export default {
        name: "Settings",
        data() {
            return {
                settings: this.$settings,
                profile: this.$profile,
                clicks: 0,
            };
        },
        computed: {
            debug() {
                return isDebug();
            }
        },
        methods: {
            saveData() {
                this.$saveData();
            },
            putNewPatterns() {
                let patterns = prompt('请输入新的模板：');
                if (patterns) {
                    patternManager.compile(patterns);
                }
            },
            overwritePatterns() {
                let patterns = prompt('请输入新的模板：');
                if (patterns) {
                    patternManager.clear();
                    patternManager.compile(patterns);
                }
            },
            clearSavedData() {
                if (confirm('确认删除所有存档？它们会消失很久……真的很久很久……')) {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                }
            },
            clickAuthor() {
                this.clicks++;
                if (this.clicks >= 5) {
                    this.clicks = 0;
                    this.setDebugCode();
                }
            },
            setDebugCode() {
                let code = prompt('请输入作者提供的调试码：')
                if (setDebugCode(code)) {
                    this.$showMessage("调试模式启动，该模式将会在刷新页面时关闭");
                } else {
                    this.$showMessage("调试模式关闭");
                }
            },
            // region debug methods
            addMessage() {
                let msg = prompt('输入测试消息：');
                this.$showMessage(msg);
            },
            // endregion
        },
    }
</script>

<style scoped>
    .settings {
        width: 100%;
        margin: 1em 0 0;
        padding: .5em 1em;
        box-sizing: border-box;

        background: #FFFFFF;

        display: flex;
        flex-direction: column;
    }

    .settings > * {
        margin: 1em ;
    }

    .settings-table {
        width: 100%;
        margin: 1em 0;
        padding: 1em;
        box-sizing: border-box;
        border-collapse: collapse;
    }

    .settings-table td {
        padding: .5em 0;
        border-bottom: .1em solid #cccccc;
    }

    .settings-table td > * {
        width: 4em;
    }

    .important {
        display: inline;

        color: #cc5b5a;
        font-weight: bold;
    }

    .author {
        color: #808080;
    }
</style>