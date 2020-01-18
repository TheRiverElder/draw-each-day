<template>
    <div class="settings">
        <table class="settings-table">
            <tr>
                <td>夜间模式（未实现）</td>
                <td><input type="checkbox" v-model="darkMode"/></td>
            </tr>
            <tr>
                <td>自动抽卡（未实现）</td>
                <td><input type="checkbox" v-model="autoDraw"/></td>
            </tr>
            <tr>
                <td>消耗（注意界限）</td>
                <td><input type="number" width="4em" v-model="cost"/></td>
            </tr>
        </table>
        <button @click="putNewPatterns">手动 添加/覆盖 模板</button>
        <button @click="overwritePatterns">手动 重写 模板</button>
        <button @click="clearSavedData">清除存档（<p class="important">慎点</p>）</button>
    </div>
</template>

<script>
    import {LOCAL_STORAGE_KEY, patternManager} from "@/game/core";

    export default {
        name: "Settings",
        data() {
            return this.$settings;
        },
        methods: {
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
            }
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
</style>