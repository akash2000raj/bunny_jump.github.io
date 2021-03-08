

import Phaser from '../lib/phaser.js';


export default class PauseScene extends Phaser.Scene{


    constructor()
    {
        super('pause_scene');

        this.presscontbtn;
    }


    
preload()
{
    this.load.image('bg1','assets/PNG/Background/bg_layer1.png');
    this.load.audio('select','assets/sounds/select_005.ogg');
    this.load.audio('switch','assets/sounds/switch_001.ogg');
    this.load.scenePlugin('rexgesturesplugin', 'src/plugins/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');

}


create()
{


    this.cameras.main.fadeIn(1000,0,0,0);
    const bg = this.add.image(0,0,'bg1');
this.buttons();

this.rexGestures.add.press(this.playbtn,{
    enable:true,
    time:10
});

}


buttons()
{


const continue_btn = this.add.text(250,200,'CONTINUE',{

color:'black',
fontSize:'40px',
backgroundColor:'yellow',
fontFamily:'Algerian'
}).setOrigin(0.5,0.5).setInteractive();


continue_btn.on('pointerover',()=>{

continue_btn.setStyle({

backgroundColor:'orange',
fontSize:'50px'


})


});


continue_btn.on('pointerout',()=>{

    continue_btn.setStyle({
    
    backgroundColor:'yellow',
    fontSize:'40px'
    
    
    })
    
    
    });
    continue_btn.on('pointerdown',()=>
    {
        this.scene.stop();
      this.scene.resume('game');

     


    })

    this.presscontbtn= this.rexGestures.add.press(continue_btn,{
        enable:true,
        time:10
    });


    this.presscontbtn.on('pressstart',()=>
    {
    
        this.scene.stop();
        this.scene.resume('game');
  
    })
}











}