

import phaser from '../lib/phaser.js';
import Phaser from '../lib/phaser.js';



export default class Menu extends Phaser.Scene{

constructor()
{



    super('menu');
 this.playbtn;
 this.pressplaybtn;
}


preload()
{
    this.load.image('bg1','assets/PNG/Background/bg_layer1.png');
this.load.audio('select','assets/sounds/select_005.ogg');
this.load.audio('switch','assets/sounds/switch_001.ogg');
this.load.scenePlugin('rexgesturesplugin', 'src/plugins/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
}


create()
{  this.cameras.main.fadeIn(1000,0,0,0);
    this.add.image(0,0,'bg1')
  this.playbtn  = this.add.text(250,200,'PLAY',{
 color:'black',
 fontSize:'40px',
 backgroundColor:'yellow',
 fontFamily:'Algerian',
 padding:{

    left:70,
    right:70

 }

    }).setOrigin(0.5,0.5);

this.playbtn.setInteractive();

this.playbtn.on('pointerover',()=>
{

 this.sound.play('switch');
    this.playbtn.setStyle({

        color:'black',
        fontSize:'50px',
        backgroundColor:'orange',
        
        });


});
this.playbtn.on('pointerout',()=>
{

this.playbtn.setStyle({

color:'black',
fontSize:'40px',
backgroundColor:'yellow',


})



})
this.playbtn.on('pointerdown',()=>
{   this.cameras.main.fadeOut(1000,0,0,0);
    this.cameras.main.fadeOut(1000,0,0,0)
    
    this.sound.play('select')
   this.time.delayedCall(1000,()=>{
        this.scene.start('game');

   })

});



//  -----touch---
this.pressplaybtn=this.rexGestures.add.press(this.playbtn,{
    enable:true,
    time:10
});

this.pressplaybtn.on('pressstart',()=>
{

    this.scene.start('game')
})

// camera section ---
//this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(can,effect)=>{


//})


}








}
