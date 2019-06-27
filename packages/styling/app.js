new Vue({
  el: "#styling",
  data: {
    attachRed: false,
    attachGreen: false,
    attachBlue: false,
    color: 'chocolate',
  },
  computed: {
    divClass() {
      return {
        red: this.attachRed,
        blue: !this.attachRed
      };
    }
  }
});
