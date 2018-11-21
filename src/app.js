new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
    healCounter: 0,
    specialAttackCounter: 0,
    healImage1Seen: true
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.healCounter = 0;
      this.specialAttackCounter = 0;
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function() {
      this.specialAttackCounter += 1;
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      this.healCounter += 1;
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage
      });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  },
  computed: {
    isHealDisabled() {
      if (this.healCounter >= 2) {
        return true;
      } else {
        return false;
      }
    },
    isSpecialAttackDisabled() {
      if (this.specialAttackCounter >= 3) {
        return true;
      } else {
        return false;
      }
    }
  }
});
