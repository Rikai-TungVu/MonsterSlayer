function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
} /* hàm lấy số random */

let currentRound= 0;

const app = Vue.createApp({
    data () {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessagers: []
        };
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0 ) {
                this.winner = 'draw';
            } else if (value <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    computed: {
        monterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } /* set this.monterBarStyles về 0% khi monsterHealth < 0 */
            return {width: this.monsterHealth + '%'};
            /* Thay đổi lượng thanh HealthBar theo % của monsterHealth */
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.playerHealth  + '%'};
            /* Thay đổi lượng thanh HealthBar theo % của playerHealth */
        },
        mayuseSATK() {
                return this.currentRound % 3 !== 0 ;
        }/* xét điều cứ cứ 3 turn dùng đc superATK 1 lần */
    },
    methods: {
        atkMonter() {
            this.currentRound++;
            /* const atkValue = Math.floor(Math.random() * (12 - 5)) + 5; */
            const atkValue = GetRandomValue(5, 12);
            /* random number 12-5 */
            this.monsterHealth = this.monsterHealth - atkValue;
            /* this.monsterHealth -= atkValue; */
            this.addLogMessage('player','attack', atkValue);
            /* Lấy log khi Player ATK Monster */
            this.atkPlayer();
        },
        atkPlayer() {
            const atkValue = GetRandomValue(5, 18);
            /* random number 12-5 */
            this.playerHealth -= atkValue;
            this.addLogMessage('monster','attack', atkValue);
            /* Lấy log khi Monster ATK Player */
        },
        superatkMonter() {
            this.currentRound++;
            const atkValue = GetRandomValue(25, 10);
            this.monsterHealth -=atkValue;
            this.addLogMessage('player','attack', atkValue);
            /* lấy log của super ATK */
            this.atkPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = GetRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
                /* ĐK: nếu heal > 0 set heal về 100 */
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player','heal', healValue);
            /* Lấy log heal */
            this.atkPlayer();
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessagers= [];
            /* Set các giá trị về ban đầu */
        },
        surrender() {
            this.winner='monster';
            /* Set winner = monster */
        },
        addLogMessage(who, what, value) {
            this.logMessagers.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game')