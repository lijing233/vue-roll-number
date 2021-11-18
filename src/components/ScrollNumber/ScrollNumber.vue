<template>
  <ul class="flex">
    <ScrollNumItem
      v-for="(number, idx) of numArr"
      :key="idx"
      :i="number"
      :delay="idx + 2.5"
      as="li"
      class="num"
    />
  </ul>
</template>

<script>
import ScrollNumItem from "./ScrollNumberItem.vue";

export default {
  name: "ScrollNumber",
  components: { ScrollNumItem },
  data: () => ({ num: 886 }),
  computed: {
    numArr() {
      const str = String(this.num);
      let arr = [];

      for (let i = 0; i < str.length; i++) {
        arr.push(parseInt(str[i]));
      }

      return arr;
    },
  },
  mounted() {
    setInterval(() => this.num++, 10000);
  },
};
</script>

<style>
.flex {
  display: flex;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
