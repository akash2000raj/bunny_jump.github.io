import Phaser from '../lib/phaser.js';



export default class Gameover extends Phaser.Scene{


constructor()
{

super('gameover');
this.gameoverSFX;

}

preload()
{
    this.load.audio('gameoversfx','assets/sounds/getready.mp3');


    
}
create()
{

    const w = this.scale.width;
    const h = this.scale.height;


    this.add.text(w*0.2,h*0.5,'GAME OVER',{

fontSize:48,
color:"#ff0000"




    })

    this.add.text(w*0.15,h*0.6,'Created by: Akash Raj',{

        fontSize:25,
        color:"#21edcb"
        
        
        
        
            })

            this.add.text(w*0.15,h*0.7,'Hit ENTER or TAP to restart',{

                fontSize:20,
                color:"#edcb21"
                
                
                
                
                    })
                    this.add.text(w*0.15,h*0.8,'This is only a protoType version,',{

                        fontSize:18,
                        color:"#ff0000"
                        
                        
                        
                        
                            })
                            this.add.text(w*0.15,h*0.85,'this game is still under progress.',{

                                fontSize:18,
                                color:"#ff0000"
                                
                                
                                
                                
                                    })

this.input.keyboard.once('keydown-ENTER',()=>
{

    this.scene.start('game');
this.gameoverSFX.stop(true);
});



//--------sound---

this.gameoverSFX = this.sound.add('gameoversfx');


this.gameoverSFX.play({


loop:true,
volume:1


})
  
}




}