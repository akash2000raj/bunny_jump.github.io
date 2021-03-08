import Phaser from '../lib/phaser.js';
//import Phaser from '../lib/phaser.js';
import Carrot from '../game/Carrot.js';
//import phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{

constructor()
{
    super('game');
this.bg1 =null;
this.platform1=null;
this.bunny=null;
this.platforms;
this.cursor=null;
/** @type {Phaser.physics.Arcade.Group} */
this.carrots;
this.collected_carrots;
this.total_carrot=null;
this.gameplaySFX;
this.pausebtn;
this.inittime;
this.leftbtn;
this.rightbtn;
this.num=100;
this.pressleft;
this.pressright;
this.presspausebtn;
this.leftvelocity =false;
this.rightvelocity=false;

}
init()
{


    this.total_carrot=0;


}

preload(){

this.load.image('bg1','assets/PNG/Background/bg_layer1.png');
this.load.image('bg2','assets/PNG/Background/bg_layer2.png');
this.load.image('bg3','assets/PNG/Background/bg_layer3.png');
this.load.image('bg4','assets/PNG/Background/bg_layer4.png');
this.load.image('platform','assets/PNG/Environment/ground_grass.png');
this.load.image('bunny_stand','assets/PNG/Players/bunny1_stand.png');
this.load.image('bunny_jump','assets/PNG/Players/bunny1_jump.png');
this.load.image('carrot','assets/PNG/Items/carrot.png');
this.load.audio('jump','assets/sounds/Mario_Jumping.mp3');
this.load.audio('gameplay','assets/sounds/gameplay.mp3');
this.load.audio('pick','assets/sounds/point.mp3');
this.load.image('pausebtn','assets/ui/shadedDark14.png');
this.load.image('l-pausebtn','assets/ui/shadedLight14.png')
this.load.image('left','assets/ui/shadedDark24.png');
this.load.image('l-left','assets/ui/shadedLight24.png');
this.load.image('right','assets/ui/shadedDark25.png');
this.load.image('l-right','assets/ui/shadedLight25.png');


//---------plugins----
this.load.scenePlugin('rexgesturesplugin', 'src/plugins/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');

}
//------------------------------CREATE------------------------------------------------
create()
{

 this.bg1=this.add.image(0,0,'bg1').setScrollFactor(0,0);
//this.platform1 = this.physics.add.sprite(200,300,'platform').setScale(0.5);
this.platforms = this.physics.add.staticGroup();


for(var i=0;i<5;i++)
{

const x = Phaser.Math.Between(80,400);
const  y=  150*i;

const platform = this.platforms.create(x,y,'platform');
platform.setScale(0.5);

platform.body.updateFromGameObject();

}


this.bunny =this.physics.add.sprite(240,370,'bunny_stand').setScale(0.4).setOrigin(0.5,0.5);
this.physics.add.collider(this.bunny,this.platforms)

this.bunny.setGravityY(500)

this.player_collision_check();

// camera portion ---------
this.cameras.main.fadeIn(1000,0,0,0)
this.cameras.main.startFollow(this.bunny);
//horizotal camera lerp---
this.cameras.main.setLerp(0,1);

// ---  control---
this.cursor = this.input.keyboard.createCursorKeys();

//console.log(this.bunny);

//------sound---

this.gameplaySFX = this.sound.add('gameplay');

this.gameplaySFX.play({
loop:true,
volume:0.5



});

//------------touch control---
/*this.press=this.rexGestures.add.press(this.leftbtn).on('pressstart',(press)=>
{
    this.num--;
console.log(this.num);

}).on('pressend',()=>
{
    console.log(this.num);

})*/


//----------event



this.events.on('resume',()=>{

 
    this.time.delayedCall(500,()=>
    {
        this.physics.resume();
        this.gameplaySFX.resume();
     
    })

})


//-----------------carrot---------



this.carrots = this.physics.add.group({

classType:Carrot,

});


//---  let's add physics properties


   for(var i=0;i<6;i++)
   {
    this.carrots.get(100*i,20,'carrot');

   }
    

     console.log(this.carrots);


this.carrots.getChildren().forEach(carrot=>
    {
    
      carrot.setGravityY(400);
      carrot.setBounceY(0.5);
  
      carrot.setCircle(20,carrot.displayWidth,carrot.displayHeight);

    })


    this.physics.add.overlap(this.bunny,this.carrots,this.collect_carrot,null,this);
    this.physics.add.collider(this.carrots,this.platforms);

    

this.score_board();
this.buttons();
this.create_rightbtn();
this.create_leftbtn();
this.pressleft=this.rexGestures.add.press(this.leftbtn,{
    enable:true,
    time:10
});
this.pressright=this.rexGestures.add.press(this.rightbtn,{
    enable:true,
    time:10
});

}
//------------------------------UPDATE--------------------------------------------------
update()
{
  
const touch = this.bunny.body.touching.down;
if(touch)
{
    this.bunny.setVelocityY(-500);
this.bunny.setTexture('bunny_jump');

this.sound.play('jump');
//this.sound.play('point');
}
const vy = this.bunny.body.velocity.y;
if(vy>0&&this.bunny.texture.key!=='bunny_stand')
{  this.bunny.setTexture('bunny_stand');
}
  


if(this.cursor.left.isDown&&!touch|| this.leftvelocity)
{
    this.bunny.setVelocityX(-200);
 
}
else if(this.cursor.right.isDown&&!touch||this.rightvelocity)
{
    this.bunny.setVelocityX(200);
    
}
else{
    this.bunny.setVelocityX(0);
   
}

//---- touch control
this.pressleft.on('pressstart',(press)=>
{
    this.leftvelocity =true;
    this.leftbtn.setTexture('l-left');
  
});
this.pressleft.on('pressend',(press)=>
{
    this.leftvelocity =false;
    this.bunny.setVelocityX(0);
    this.leftbtn.setTexture('left');
})

this.pressright.on('pressstart',(press)=>
{
    this.rightvelocity =true;
    this.rightbtn.setTexture('l-right');
});
this.pressright.on('pressend',(press)=>
{
    this.rightvelocity =false;
    this.bunny.setVelocityX(0);
    this.rightbtn.setTexture('right')
});

//--------
this.recycle_platforms();
//------
this.horizontal_warp(this.bunny);
//------

const bottom_most_platform= this.find_bottom_most_platform();
if(this.bunny.y>bottom_most_platform.y+100)
{
    //console.log('GAME OVER');
    this.gameplaySFX.stop(true);

    this.scene.start('gameover');
   


      
        
        
          
  
}

}




//------------------------------------------------
recycle_platforms(){

this.platforms.children.iterate(child=>{

const each_platform= child;

const scrollY= this.cameras.main.scrollY;

if(each_platform.y>=scrollY+650)
{

each_platform.y = scrollY - Phaser.Math.Between(50,80);

this.add_carrot_above(each_platform);
each_platform.body.updateFromGameObject();



}



})


}


add_carrot_above(sprite)
{

const y = (sprite.y-sprite.displayHeight)+5;
const new_carrot=  this.carrots.get(sprite.x,y,'carrot');

this.add.existing(new_carrot);

new_carrot.setActive(true);
new_carrot.setVisible(true);
// update this new carrot's physical size

new_carrot.setScale(0.5);
new_carrot.setGravityY(400);
new_carrot.setCircle(20,new_carrot.displayWidth,new_carrot.displayHeight);
this.physics.world.enable(new_carrot);
//return new_carrot;
}




player_collision_check()
{

    this.bunny.body.checkCollision.up=false;
    this.bunny.body.checkCollision.left=false;
    this.bunny.body.checkCollision.right=false;


}

horizontal_warp(sprite)
{
const halfwidth = sprite.displayWidth*0.5;
const  screenwidth = this.scale.width;

if(sprite.x+halfwidth<0)
{

    sprite.x=screenwidth-halfwidth;
}
else if(sprite.x+halfwidth>screenwidth)
{
  
  sprite.x=-halfwidth;
}


}



score_board()
{
const style = {
color:'#000',
fontSize:30

}

this.collected_carrots = this.add.text(240,10,'Carrots:0',style).setScrollFactor(0).setOrigin(0.5,0);



}

find_bottom_most_platform()
{

const allplatforms = this.platforms.getChildren();
let bottom_platform = allplatforms[0];


for(var i=0;i<allplatforms.length;i++)
{
const current_platform= allplatforms[i];
if(current_platform.y<bottom_platform.y)
{
continue;
}
else{
bottom_platform=current_platform;
}

}
return bottom_platform;
}

collect_carrot(player,item)
{

this.carrots.killAndHide(item);
this.physics.world.disableBody(item.body)
this.total_carrot++;
this.sound.play('pick');
const value = `Carrots:${this.total_carrot}`;
this.collected_carrots.text =value;

}

buttons()
{

this.pausebtn = this.add.image(450,25,'pausebtn').setScrollFactor(0).setScale(0.5).setOrigin(0.5,0.5).setInteractive();

this.pausebtn.on('pointerover',()=>
{

    this.pausebtn.setTexture('l-pausebtn');

})
this.pausebtn.on('pointerout',()=>
{

    this.pausebtn.setTexture('pausebtn');

})

/*this.pausebtn.on('pointerdown',()=>
{
this.pausebtn.setTexture('l-pausebtn');
this.scene.pause();
this.physics.pause();
this.scene.launch('pause_scene')
this.gameplaySFX.pause();

})*/

this.presspausebtn =this.rexGestures.add.press(this.pausebtn,{
    enable:true,
    time:10
 });
 this.presspausebtn.on('pressstart',(press)=>
 {
 
    this.pausebtn.setTexture('l-pausebtn');
    this.scene.pause();
    this.physics.pause();
    this.scene.launch('pause_scene')
    this.gameplaySFX.pause();
    
 
 });
 this.presspausebtn.on('pressend',(press)=>
 {
 
    this.pausebtn.setTexture('pausebtn');

 })


}

create_rightbtn()
{

this.rightbtn = this.add.image(430,550,'right').setScrollFactor(0).setScale(0.8).setInteractive();
this.rightbtn.on('pointerdown',()=>
{


    
})

}
create_leftbtn()
{

this.leftbtn = this.add.image(50,550,'left').setScrollFactor(0).setScale(0.8).setInteractive();

}




}
