<template>
    <div ref="root" class="card">
        <div class="title">{{ fullName }}</div>
        <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-content"></div>
            <div class="divider-line"></div>
        </div>
        <div class="description">
            <p>住址：<span class="hand-write">{{ address }}</span></p>
            <p>神器：<span class="hand-write">{{ artifact }}</span></p>
            <p class="hand-write">{{ story }}</p>
        </div>
    </div>
</template>

<script>
    import affixes from "@/config/affixes";

    export default {
        name: "Card",
        props: ['card'],
        data() {
            return this.card;
        },
        computed: {
            fullName() {
                let affix = affixes[this.affixId];
                return affix.text + this.name;
            },
        },
        mounted() {
            this.$refs.root.style.background = this.card.color;
        },
    }
</script>

<style scoped>

    .puzzle {
        font-family: '迷你繁篆书', Helvetica, Arial, sans-serif;
    }

    .card {
        width: 10em;
        height: 22em;
        padding: 1em;
        border-radius: 1em;

        background: darkgrey;
        color: #FFFFFF;

        display: flex;
        flex-direction: column;
        text-align: center;

        text-wrap: none;
    }

    .title {
        font-family: '方正姚体', 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 2em;
        font-weight: bold;
        white-space: nowrap;
    }

    .description {
        font-size: 1em;
        text-align: left;
    }

    .hand-write {
        font-family: '书体坊安景臣钢笔行书', 'Avenir', Helvetica, Arial, sans-serif;
    }

    .description > * {
        margin-top: 0;
    }

    .divider {
        width: 100%;
        margin: 1em 0;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .divider-line {
        flex: 1;
        height: .25em;
        padding: 0;
        margin: 0;

        background: #FFFFFF;
    }

    .divider-content {
        width: .5em;
        height: .5em;
        border-radius: .25em;
        padding: 0;
        margin: 0 .5em;

        background: #FFFFFF;
    }

</style>