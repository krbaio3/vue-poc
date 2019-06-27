<template>
  <div class="component">
    <h1>The User Component (Parent Component)</h1>
    <p>I'm an awesome User!</p>
    <button @click="changeName">Change my name</button>
    <p>Name is {{name}}</p>
    <p>Name is {{age}}</p>
    <hr />
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <app-user-detail
          :myName="name"
          :resetFn="resetName"
          @nameWasReset="name = $event"
          :userAge="age"
        ></app-user-detail>
      </div>
      <div class="col-xs-12 col-sm-6">
        <app-user-edit :userAge="age" @ageWasEdited="age = $event"></app-user-edit>
      </div>
    </div>
  </div>
</template>

<script>
import UserDetail from './UserDetail.vue';
import UserEdit from './UserEdit.vue';

export default {
  data() {
    return {
      name: 'Jorge',
      age: 27,
    };
  },
  components: {
    appUserDetail: UserDetail,
    appUserEdit: UserEdit,
  },
  methods: {
    changeName() {
      this.name = 'Angela';
    },
    resetName() {
      this.name = 'Jorge';
    },
  },
};
</script>

<style scoped>
div {
  background-color: lightblue;
}
</style>
