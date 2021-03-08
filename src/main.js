


import phaser from './lib/phaser.js';
import Game from './scenes/Game.js';
import Gameover from './scenes/Gameover.js';
import Menu from './scenes/Menu.js';
import PauseScene from './scenes/PauseScene.js'
const config = {

type:Phaser.AUTO,
width:480,
height:640,
scene:[Menu,Game,Gameover,PauseScene],
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
mode:Phaser.Scale.FIT,
autoCenter:phaser.Scale.CENTER_BOTH

}
}

export default new Phaser.Game(config)