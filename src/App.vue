<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="count" />
    <div class="show-number">
      <RollNumber :rollNumber="rollNumber2"></RollNumber>
    </div>
    <div>
      <input type="text" v-model="inpValue" />
      <button @click="rollNumber2 = inpValue">click</button>
    </div>
  </div>
</template>

<script>
import RollNumber from "@/components/RollNumber.vue";
export default {
  components: {
    RollNumber,
  },
  name: "App",
  data() {
    return {
      rollNumber: "6",
      rollNumber2: "0",
      inpValue: "",
    };
  },
  methods: {
    count() {
      if (this.rollNumber === 9) {
        this.rollNumber = 5;
      } else {
        this.rollNumber++;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.show-number {
  width: 300px;
  /* height: 100px; */
  font-size: 50px;
  color: hotpink;
  margin: 0 auto;
}
</style>
