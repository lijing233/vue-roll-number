<template>
  <div class="v-roll-number-container">
    <div
      class="v-roll-wapper"
      :style="{ height: `${wapperHeight}px` }"
      ref="rollWapper"
    >
      <div class="v-roll-item" v-for="(item, idx) in showDigitList" :key="idx">
        <div v-if="isNaN(item.value)" class="v-roll-symbol">
          {{ item.value }}
        </div>
        <div
          v-else
          class="v-roll-value"
          :style="getTransitionStyle(item)"
          v-html="innerHtml"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDomHeight } from "./utils/index";
export default {
  name: "RollNumber",
  props: {
    rollNumber: {
      type: [Number, String],
      default: "0",
    },
    dur: {
      type: Number,
      default: 1000,
    },
    timingFunc: {
      type: String,
      default: "ease-in-out",
    },
    sameNumRoll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const divList = numberList
      .concat(numberList)
      .map((n) => `<div>${n}</div>`)
      .join("");
    return {
      beforeDigits: "",
      digits: "",
      showDigitList: [],
      innerHtml: divList,
      wapperHeight: 0,
      rollLock: false,
      transitionEndCount: 0,
    };
  },
  watch: {
    rollNumber(value, oldVal) {
      console.log(oldVal, value);
      if (this.rollLock) {
        console.log("is locked!!!!");
        return;
      }
      this.beginRoll();
    },
  },
  created() {
    this.initDigitList();
  },
  mounted() {
    this.initWapperHeight();
    // 数字滚动
    this.handleNumberRoll();
  },
  methods: {
    // 初始化容器高度
    initWapperHeight() {
      const el_roll_wapper = this.$refs.rollWapper;
      this.wapperHeight = getDomHeight(
        el_roll_wapper.querySelector(".v-roll-value>div")
      );
      console.log("this.cellHeight :>> ", this.cellHeight);
    },
    // 获取过渡样式
    getTransitionStyle(item) {
      const translateVal = `translate3d(0, -${item.offset || 0}px, 0)`;
      const transitionVal = item.noTransition
        ? ""
        : `transform ${this.dur / 1000}s ${this.timingFunc}`;
      // console.log({
      //   transition: transitionVal,
      //   transform: translateVal,
      // });
      return {
        transition: transitionVal,
        transform: translateVal,
      };
    },
    beginRoll() {
      // 初始化list
      this.initDigitList();
      // 开始动画
      this.$nextTick(() => {
        this.handleNumberRoll();
      });
    },
    initDigitList() {
      this.digits = `${this.rollNumber}`;
      const offsetMap = this.showDigitList.map((i) => {
        return i.offset || 0;
      });
      this.showDigitList = this.digits.split("").map((i, idx) => {
        return {
          value: i,
          offset: offsetMap[idx],
        };
      });
    },
    handleNumberRoll() {
      console.log("this.beforeDigits :>> ", this.beforeDigits);
      console.log("this.digits :>> ", this.digits);
      const beforeNum =
        this.beforeDigits || new Array(this.digits.length).fill(0).join("");
      // const nowNum = this.digits;
      // console.log("now :>> ", nowNum);

      this.$emit("roll-start");
      this.rollLock = true;

      const wapperEl = this.$refs.rollWapper;

      this.showDigitList.forEach((item, index) => {
        const before = beforeNum[index] || 0;
        const next = item.value;
        console.log("----------------------------------------");
        console.log("before :>> ", before);
        console.log("next :>> ", next);

        if (isNaN(next) || (!this.sameNumRoll && next == before)) {
          console.log("dont need rolll!");
          console.log(this.showDigitList[index]);
          this.checkTransitionComplete();
        } else {
          const offset = isNaN(next)
            ? 0
            : next > before
            ? Number(next)
            : 10 + Number(next);
          // console.log("offset :>> ", offset);
          console.log("need roll!!!");
          this.$set(this.showDigitList, index, {
            ...this.showDigitList[index],
            offset: offset * this.wapperHeight,
            noTransition: false,
          });
          // console.log(this.showDigitList[index]);
          // console.log(`.v-roll-item:nth-child(${index + 1}) .v-roll-value`);
          const itemEl = wapperEl.querySelector(
            `.v-roll-item:nth-child(${index + 1}) .v-roll-value`
          );
          // console.log("itemEl... :>> ", itemEl);
          const transitionDone = () => {
            console.log("transitionend");
            // console.log("itemEl", itemEl);
            // 重置dom偏移
            // console.log(this.showDigitList[index].offset);
            // console.log(this.wapperHeight * 10);

            itemEl.removeEventListener("transitionend", transitionDone);
            console.log(
              "this.showDigitList[index].offset",
              this.showDigitList[index].offset
            );
            if (this.showDigitList[index].offset >= this.wapperHeight * 10) {
              console.log("-----dddddd----", next * this.wapperHeight);
              this.$set(this.showDigitList, index, {
                ...this.showDigitList[index],
                offset: next * this.wapperHeight,
                noTransition: true,
              });
            }
            this.checkTransitionComplete();
          };
          itemEl.addEventListener("transitionend", transitionDone);
        }

        console.log("----------------------------------------");
      });
      // console.log(this.showDigitList);
    },
    // 检查滚动动画是否全部完成
    checkTransitionComplete() {
      this.transitionEndCount++;
      console.log(this.transitionEndCount);
      if (this.transitionEndCount >= this.showDigitList.length) {
        console.log("all number roll end!");
        this.beforeDigits = this.digits;
        this.transitionEndCount = 0;

        this.checkNumberUpdate();
      }
    },
    // 检查当前显示是否和传入数值一致
    checkNumberUpdate() {
      const latestNum = `${this.rollNumber}`;
      console.log("check is same:", latestNum, this.digits);
      if (this.digits !== latestNum) {
        this.beginRoll();
        // setTimeout(() => {
        // }, 100);
      } else {
        this.rollLock = false;
      }
    },
  },
};
</script>

<style>
.v-roll-number-container {
  margin: 0 auto;
  width: 100%;
}
.v-roll-wapper {
  margin: 0 auto;
  padding: 0;
  text-align: center;
  display: flex;
  overflow: hidden;
}
.v-roll-item,
.v-roll-symbol {
  /* flex-grow: 1; */
  overflow: hidden;
}
</style>
