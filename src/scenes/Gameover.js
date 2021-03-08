import Phaser from '../lib/phaser.js';



export default class Gameover extends Phaser.Scene{


constructor()
{

super('gameover');
this.gameoverSFX;
this.restartbtn;
this.exitbtn;
this.pressrestartbtn;
this.pressexitbtn;
}

preload()
{
    this.load.audio('gameoversfx','assets/sounds/getready.mp3');
    this.load.image('bg1','assets/PNG/Background/bg_layer1.png');
    this.load.audio('select','assets/sounds/select_005.ogg');
    this.load.audio('switch','assets/sounds/switch_001.ogg');
    this.load.scenePlugin('rexgesturesplugin', 'src/plugins/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
}
create()
{

    const w = this.scale.width;
    const h = this.scale.height;
 this.cameras.main.fadeIn(1000,0,0,0)
 this.add.image(0,0,'bg1');
    this.add.text(w*0.2,h*0.2,'GAME OVER',{

fontSize:'50px',
color:"#ff0000",
fontFamily:'Algerian',



    });
 
   this.createrestartbtn();
   this.create_exit_btn();
//--------sound---

this.gameoverSFX = this.sound.add('gameoversfx');


this.gameoverSFX.play({


loop:true,
volume:1


});
//----------touch 




  
}



createrestartbtn()
{

    this.restartbtn = this.add.text(240,250,'RESTART',{
        color:'black',
        fontSize:'40px',
        backgroundColor:'yellow',
        fontFamily:'Algerian',
        padding:{
       
           left:70,
           right:70
       
        }
       
           }).setOrigin(0.5,0.5).setInteractive();



        this.restartbtn.on('pointerover',()=>
        {
this.sound.play('switch');
this.restartbtn.setStyle({
backgroundColor:'orange',
fontSize:'50px'


});




        });

        this.restartbtn.on('pointerout',()=>
{

this.restartbtn.setStyle({
backgroundColor:'yellow',
fontSize:'40px'


})

});

/*this.restartbtn.once('pointerdown',()=>
{

this.sound.play('select')
this.gameoverSFX.stop();
this.scene.start('game')

});*/
this.pressrestartbtn=  this.rexGestures.add.press(this.restartbtn,{
   enable:true,
   time:10
});
this.pressrestartbtn.on('pressstart',(press)=>
{

   this.sound.play('select')
   this.gameoverSFX.stop();
   this.scene.start('game')

})

}


create_exit_btn(){



    this.exitbtn = this.add.text(240,320,'    EXIT    ',{
        color:'black',
        fontSize:'40px',
        backgroundColor:'yellow',
        fontFamily:'Algerian',
        padding:{
       
           left:70,
           right:70
       
        }
       
           }).setOrigin(0.5,0.5).setInteractive();



        this.exitbtn.on('pointerover',()=>
        {
this.sound.play('switch');
this.exitbtn.setStyle({
backgroundColor:'orange',
fontSize:'50px'


});




        });

        this.exitbtn.on('pointerout',()=>
{

this.exitbtn.setStyle({
backgroundColor:'yellow',
fontSize:'40px'


})

});
this.exitbtn.once('pointerdown',()=>
{

this.sound.play('select')
this.gameoverSFX.stop();
this.scene.stop();
this.scene.start('menu')

})
this.pressrexitbtn=  this.rexGestures.add.press(this.exitbtn,{
   enable:true,
   time:10
});

this.pressrexitbtn.on('pressstart',(press)=>
{

   this.sound.play('select')
this.gameoverSFX.stop();
this.scene.stop();
this.scene.start('menu')
})




}



}