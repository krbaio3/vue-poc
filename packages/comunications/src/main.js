import App from './App.vue';
import Vue from 'vue';

export const eventBus = new Vue({
  methods: {
    changeAge(age) {
      this.$emit('ageWasEdited', age);
    },
  },
});

new Vue({
  el: '#app',
  render: (h) => h(App),
});
