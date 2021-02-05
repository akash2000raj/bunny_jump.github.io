


import phaser from './lib/phaser.js';
import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';
import Gameover from './scenes/Gameover.js';
const config = {

type:Phaser.AUTO,
width:480,
height:640,
scene:[Game,Gameover],
physics:{

default:'arcade',

arcade:{
    gravity:{

    },
//debug:true
}

}
,
scale:{

autoCenter:phaser.Scale.CENTER_BOTH

}
}

export default new Phaser.Game(config)