<template>
  <div id="app">
    <TopBar title="阿卡姆事务局" />
    <div class="content">
      <p v-if="!profile.storage.length">当前还没有任何卡片！</p>
      <Card v-for="card of profile.storage" :key="card.uid" :card="card"/>
    </div>
    <div class="message-list">
      <p v-for="message of messages" :key="message">{{ message }}</p>
    </div>
    <div class="setting-button" @click="configureSettings = true">
      <img :src="icons.settings"/>
    </div>

    <Overlay v-if="configureSettings" @exit-overlay="configureSettings = false">
      <Settings />
    </Overlay>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import TopBar from "@/components/TopBar";
import Overlay from "@/components/Overlay";
import Settings from "@/components/Settings";

import iconSettings from '@/assets/icon/settings.svg';

export default {
  name: 'app',
  components: {
    Settings,
    Overlay,
    TopBar,
    Card,
  },
  data() {
    return {
      profile: this.$profile,
      settings: this.$settings,
      messages: this.$messageList,

      configureSettings: false,
      icons: {
        settings: iconSettings,
      },
    };
  },

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

  .setting-button {
    width: 3em;
    height: 3em;
    border: #42b983 solid .2em;
    border-radius: 2em;
    box-sizing: border-box;

    position: absolute;
    bottom: 1em;
    right: 1em;
  }

  .setting-button > img {
    width: 2em;
    height: 2em;
    margin: .25em;
    padding: 0;
    box-sizing: border-box;
  }
</style>

<style>
  button {
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
    padding: .3em 1em;
    border-radius: 1em;
    border-width: .1em;
    border-style: solid;
    outline: none;

    background: #FFFFFF;
    color: #42b983;
    border-color: #42b983;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 1em;
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

  .message-list {
    width: 100%;
    text-align: left;
  }

  .message-list > p {
    width: 100%;
  }


</style>