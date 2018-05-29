<template>
  <div id="app">
    <h1>聊起來</h1>
    <ul>
      <li v-for="msg in messages">
        {{ msg.name }}: 
        {{ msg.message }}
      </li>
    </ul>

    <input ref="name" type="text" placeholder="name" value="路人">
    <input ref="message" type="text" placeholder="message">
    <button @click="addMessage">留言</button>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://127.0.0.1:4040");

export default {
  name: "app",
  data() {
    return {
      messages: []
    };
  },
  created() {
    console.log("hi app.vue");
    // socket.emit("newMessage", "hello world.");
    socket.on("syncMessages", messages => {
      console.log(messages);
      this.messages = messages;
    });
  },
  methods: {
    addMessage() {
      console.log(this.$refs.name.value, this.$refs.message.value);
      socket.emit("newMessage", {
        name: this.$refs.name.value,
        message: this.$refs.message.value
      });
      this.$refs.name.value = "";
      this.$refs.message.value = "";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
