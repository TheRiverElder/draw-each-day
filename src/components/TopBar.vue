<template>
    <div :class="topBarClass" ref="topBar">
        <p class="top-bar-title">阿卡姆侦探事务所</p>
        <p class="top-bar-content">账户余额：{{ profile.account }}</p>
        <div class="draw-panel">
            <button class="hollow" :disabled="!canDraw" @click="drawCard">抽卡</button>
            <input class="price-input"
                   type="number"
                   min="1"
                   :max="profile.account"
                   v-model="settings.cost"
                   placeholder="抽卡消耗"/>
            <p>消耗：</p>
        </div>

    </div>
</template>

<script>

    export default {
        name: "TopBar",
        props: {
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                settings: this.$settings,
                profile: this.$profile,
                mobile: false,
            }
        },
        computed: {
            canDraw() {
                return this.settings.cost > 0 && this.$checkAccount(this.settings.cost) && this.$canDraw();
            },

            topBarClass() {
                return (this.mobile ? 'mobile-' : '') + 'top-bar';
            },
        },
        methods: {
            drawCard() {
                let err = this.$draw();
                if (err) {
                    alert(err);
                } else {
                    this.$saveData();
                }
            }
        },
        mounted() {
            let width = this.$refs.topBar.clientWidth;
            let fontSize = parseInt(getComputedStyle(this.$refs.topBar).fontSize);
            this.mobile = (width < fontSize * 30);
        }
    }
</script>

<style scoped>
    .top-bar {
        width: 100%;
        padding: 1em 2em;
        box-sizing: border-box;

        background: #42b983;
        color: #FFFFFF;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .mobile-top-bar {
        width: 100%;
        padding: 1em 2em;
        box-sizing: border-box;

        background: #42b983;
        color: #FFFFFF;
    }

    .mobile-top-bar > * {
        display: inline-block;
    }

    .top-bar-title {
        font-size: 1.5em;
        margin: 0 1em;
    }

    .top-bar-content {
        flex: 1;
        text-align: left;
    }

    .draw-panel {
        margin: auto;
        text-align: center;

        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .price-input {
        margin-right: 2em;
        width: 4em;
        text-align: center;
    }
</style>