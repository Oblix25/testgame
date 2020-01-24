
import Solder from './enemies.js';


function spawner(map, spawnpoints, scene)
{

  //let enemyNum = 1;
  //let regName;

  //objects in map are checked by type(assigned in object layer in Tiled) and the appopriate extended sprite is created

    const objects = map.getObjectLayer('stuff'); //find the object layer in the tilemap named 'objects'

    objects.objects.forEach(
     (object) => {

       //create a series of points in our spawnpoints array
       if (object.type === 'spawn') {
         spawnpoints[object.name] = {
           x: object.x + 8,
           y: object.y - 8
         }
       }

       if (object.type === "enemy") {
                 //check the registry to see if the enemy has already been killed. If not create the enemy in the level and register it with the game
                 //regName = `_Enemies_${enemyNum}`;
                   let enemy = new Solder({scene: scene, x: object.x + 8, y: object.y - 8});
                   scene.enemies.add(enemy);
                   //scene.registry.set(regName, 'active');

                 //enemyNum += 1;
               }
     });
}



export {spawner};
