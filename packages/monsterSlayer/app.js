const max = 10;
const min = 3;
const monstMax = 12;
const monstMin = 5;

new Vue({
  el: '#slayer',
  data: {
    newGame: true,
    myHealth: 100,
    monsterHealth: 100,
    logAttacks: []
  },
  methods: {
    attackHandler() {
      this.playerAttack(min, max) ? this.monsterAttack(monstMin, monstMax) : 0;
    },
    specialAttakHandler() {
      this.playerAttack(min, max) ? this.monsterAttack(monstMin, monstMax) : 0;
    },
    playerAttack(min, max) {
      let attack = this.calculateDamage(min, max);
      this.monsterHealth -= attack;
      this.logger(attack, 'PLAYER', 'MONSTER', true);
      if (this.checkWin()) {
        return false;
      }
      return true;
    },
    monsterAttack(min, max) {
      let attack = this.calculateDamage(min, max);
      this.myHealth -= attack;
      this.logger(attack, 'MONSTER', 'PLAYER', false);
      this.checkWin();
    },
    healthyHandler() {
      this.myHealth <= 90 ? (this.myHealth += 10) : (this.myHealth = 100);
      this.logger(10, 'PLAYER', false,  true)
      this.monsterAttack(monstMin, monstMax);
      // this.logger(a, r);
    },
    logger(attack, who, toWho, isPlayer) {
      if (toWho) {
        this.logAttacks.unshift({
          name: `${who} HITS ${toWho} FOR ${attack}`,
          isPlayer
        });
      } else {
        this.logAttacks.unshift({
          name: `${who} HEALS FOR ${attack}`,
          isPlayer
        });
      }
    },
    resetHandler() {
      this.newGame = true;
      this.myHealth = 100;
      this.monsterHealth = 100;
      this.logAttacks = [];
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        return this.confirmDialog('Won');
      } else if (this.myHealth <= 0) {
        return this.confirmDialog('Lost');
      }
      return false;
    },
    confirmDialog(text) {
      if (confirm(`You ${text}!, New Game?`)) {
        this.resetHandler();
        this.newGame = false;
      } else {
        this.resetHandler();
      }
      return true;
    }
  },
  computed: {}
});
