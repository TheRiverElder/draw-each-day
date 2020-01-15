<template>
  <div id="app" ref="app">
    <div :class="topBarClass">
      <p class="top-bar-title">阿卡姆侦探事务所</p>
      <p class="top-bar-content">账户余额：{{ profile.account }}</p>
      <div class="draw-panel">
        <button class="hollow" :disabled="!enoughAccount" @click="drawCard">抽卡</button>
        <input class="simple-hollow price-input"
               type="number"
               min="1"
               :max="profile.account"
               v-model="price"
               placeholder="100"/>
        <p>消耗：</p>
      </div>

    </div>
    <div class="content">
      <p v-if="!profile.storage.length">当前还没有任何卡片！</p>
      <Card v-for="card of profile.storage" :key="card.uid" :card="card"/>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import {profile, draw} from './game/core.js'
import {checkAccount} from "./game/core";

export default {
  name: 'app',
  components: {
    Card,
  },
  data() {
    return {
      profile: profile,
      price: 100,
      mobile: false,
    };
  },
  computed: {
    enoughAccount() {
      return this.price > 0 &&  checkAccount(this.price);
    },

    topBarClass() {
      return (this.mobile ? 'mobile-' : '') + 'top-bar';
    },
  },
  methods: {
    drawCard() {
      if (!draw(this.price)) {
        alert("余额不足！");
      }
    }
  },
  mounted() {
    let width = this.$refs.app.clientWidth;
    let fontSize = parseInt(getComputedStyle(this.$refs.app).fontSize);
    this.mobile = (width < fontSize * 30);
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
}

  html, body, #app {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

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

  .content {
    width: 100%;
    flex: 1;
    padding: 1em;
    box-sizing: border-box;


    display: flex;
    flex-direction: row;
    overflow-x: scroll;
  }

  .content > * {
    margin-left: .5em;
    margin-right: .5em;
    flex-shrink: 0;
  }

  .error {
    color: #ff4040;
  }
</style>

<style>
  button, input {
    height: 2em;
    padding: .3em 1em;
    border-radius: 1em;
    border-width: 0;
    border-style: solid;
    outline: none;

    background: #42b983;
    color: #FFFFFF;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 1em;

    user-select: none;
  }

  input {
    height: 1.2em;
  }

  button:hover {
    background: #64b989;
  }

  button:active {
    background: #268050;
  }

  button:disabled {
    background: #808080;
  }

  .hollow, .simple-hollow {
    border-width: .1em;
    border-color: #42b983;

    background: #FFFFFF;
    color: #42b983;
  }

  .hollow:hover {
    border-color: #268050;

    background: #cccccc;
    color: #268050;
  }

  .hollow:active {
    border-color: #64b989;

    background: #cccccc;
    color: #64b989;
  }

  .hollow:disabled {
    border-color: #808080;

    background: #cccccc;
    color: #808080;
  }



</style>