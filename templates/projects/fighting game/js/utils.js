function rectangularCollision ({rectangle1, rectangle2}){
    
        
    return   rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
             rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
             rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
             rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
                 
 }
 
 function determinWinner({player, enemy, timerid}){
     clearTimeout(timerid)
     result.style.display = 'flex'
     if (player.health == enemy.health){
         result.innerHTML = 'Tie'
         
     }
     else if ( player.health > enemy.health){
         result.innerHTML = 'Player 1 wins'
         
     }
     else {
         result.innerHTML = 'Player 2 wins'
         
     }
 }
 
 let timer = 60
 let timerid
 function decreaseTimer(){
     timerid = setTimeout(decreaseTimer, 1000)
     let result = document.querySelector('#result')
     
     if (timer > 0){
        timer-- 
        document.querySelector('#timer').innerHTML = timer
     }
     if (timer === 0){
         determinWinner({player, enemy, timerid})
     }
     
 }