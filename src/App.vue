<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" @click="count" /> -->
    <div class="show-number">
      <RollNumber :rollNumber="rollNumber"></RollNumber>
    </div>
    <div class="show-number">
      <ScrollNumber></ScrollNumber>
    </div>
    <div>
      <input type="text" v-model="inpValue" />
      <button @click="rollNumber = inpValue">click</button>
    </div>
  </div>
</template>

<script>
import RollNumber from "@/components/RollNumber/RollNumber.vue";
import ScrollNumber from "@/components/ScrollNumber/ScrollNumber.vue";
export default {
  components: {
    RollNumber,
    ScrollNumber,
  },
  name: "App",
  data() {
    return {
      rollNumber: "6",
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
