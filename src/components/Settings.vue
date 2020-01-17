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
        <button>手动添加</button>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return this.$settings;
        },
    }
</script>

<style scoped>
    .settings {
        width: 100%;
        padding: 1em .5em;
        box-sizing: border-box;

        background: #FFFFFF;
    }

    .settings-table {
        width: 100%;
        margin: 0;
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
</style>