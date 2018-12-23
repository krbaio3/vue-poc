new Vue({
    el: '#app',
    data: {
        healthYou: 100,
        healthMonster: 100,
        startAttack: true,
    },
    methods: {
        startNewGame: function () {
            console.log('entra');
            this.healtMonster = 100;
            this.healtMonster = 100;
            this.startAttack = false;
        },
        attack: (params) => {
            console.log('ataque');
        },

        specialAttack: () => {
            console.log('special Attack');
        },
        heal: () => {
            console.log('heal');
        },
        giveUp: () => {
            console.log('give up');
        }
    },
});