let app = new Vue({
    el: '#app',
    data: {
        playing: false,
        limitGauge: 0,
        playerHealth: 100,
        monsterHealth: 100,
        messageBus: []
    },
    watch: {
        playerHealth: function() {
            if (this.playerHealth <= 0) {
                alert('You Lose :(');
                this.giveUp();
            }
        },
        monsterHealth: function() {
            if (this.monsterHealth <= 0) {
                alert('You Win :)');
                this.giveUp();
            }
        }
    },
    methods: {
        _rollDice: function(limit) {
            return parseInt(Math.random() * limit) + 1;
        },
        newGame: function() {
            this.playing = true;
        },
        endGame: function() {
            this.playing = false;
        },
        attack: function() {
            let playerDiceRoll = this._rollDice(15);
            let monsterDiceRoll = this._rollDice(15);
            this.monsterHealth -= playerDiceRoll;
            this.playerHealth -= monsterDiceRoll;
            this.limitGauge += 2;
            this.messageBus.unshift(
                {
                    message: 'Player dealt ' + playerDiceRoll + ' HP at Monster!',
                    subject: 'player'
                },
                {
                    message: 'Monster dealt ' + monsterDiceRoll + ' HP at Player!',
                    subject: 'monster'
                }
            );
        },
        limitBreak: function() {
            let playerDiceRoll = this._rollDice(30);
            let monsterDiceRoll = this._rollDice(15);
            this.monsterHealth -= playerDiceRoll;
            this.playerHealth -= monsterDiceRoll;
            this.limitGauge = 0;
            this.messageBus.unshift(
                {
                    message: 'Player dealt ' + playerDiceRoll + ' HP at Monster!',
                    subject: 'player'
                },
                {
                    message: 'Monster dealt ' + monsterDiceRoll + ' HP at Player!',
                    subject: 'monster'
                }
            );
        },
        heal: function() {
            let healed = this._rollDice(30);
            let monsterDiceRoll = this._rollDice(15);
            this.playerHealth += healed;
            this.playerHealth -= monsterDiceRoll;
            this.messageBus.unshift(
                {
                    message: 'Player healed for ' + healed + ' HP!',
                    subject: 'player'
                },
                {
                    message: 'Monster dealt ' + monsterDiceRoll + ' damage at Player!',
                    subject: 'monster'
                }
            );
        },
        giveUp: function() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.limitGauge = 0;
            this.playing = false;
            this.messageBus = [];
        }
    }
});
