import React, { use } from "react";
import { useState, useEffect ,useRef } from "react";
import "./game.css";
let died = "/src/components/dizzy.png"
let alive = "/src/components/in-love.png"

function Game() {
  const [isJumping, setIsJumping] = useState(false);
  const [start , setStart] = useState(false);
  const [Xdim, setXdim] = useState(0);
  const [gameOver , setGameOver] = useState(false);
  const [level , changeLevel] = useState(1);
  const dif = useRef(3200)
  const speed = useRef(0.9);
var last = 0 ;
const int1 = useRef(null);
const int = useRef(null);
const cacShowing = useRef(null)
const gameDur = useRef(null)
  const [discac, setcac] = useState(false);
  const [Ydim, setYdim] = useState([{x : 0 , visible : true}]);
  

  function jumpAnimation() {
   
      var x = 0;
    var reached = false;
   if(int.current){
    clearInterval(int.current)
   }
   int.current = setInterval(() => {
      setIsJumping(true);
      if (x == 155) {
        reached = true;
      }
      if (!reached) {
        x++;
      }

      if (reached) {
        x--;
      }
      if (x == 0) {     
        clearInterval(int.current);
      }
      setXdim(x);
    },5
  );

  
    
  }

function cactusAnimation() {
 setcac(true);

  if(int1.current){
    clearInterval(int1.current)
  }
  int1.current = setInterval(() => {
      setYdim(prev => {
      const newYdim = prev
      
        .map(c => ({ ...c, x: c.x + speed.current, visible: c.x + speed.current < 700 }))
        .filter(c => c.visible);
      return newYdim;
    });
    
  }, 1);
}
// change the difficulty over time 
useEffect(()=>{
  if(gameOver){

    clearInterval(gameDur.current)
  }
  gameDur.current = setInterval(() => {
    if(dif.current > 1400){
      dif.current = dif.current - 100 ;
      speed.current = speed.current + 0.05
      changeLevel(prev => prev + 1)
    }
    

  }, 3500);

  return ( )=> clearInterval(gameDur.current)
},[gameOver,dif,speed])

// add a cactus after a random time 

 useEffect(()=>{

    if(cacShowing.current){
      clearInterval(cacShowing.current);
    }
    console.log("the new diffeculty is : " , dif.current)
     cacShowing.current = setInterval(() => {
      console.log(gameOver)
      if(gameOver){
        clearInterval(cacShowing.current)
      }else{
      var a = {x : 0 , visible : true};
      setYdim((arr) => [...arr, a]);
      console.log("added cactus")
      }
     
    }, dif.current);
    return ()=>clearInterval(cacShowing.current)
    
 },[dif.current])
    
   
  
    
  function restart(){
    setGameOver(false);
    setXdim(0);
    setYdim([{x:0,visible:true}]);
    cactusAnimation();
   
    dif.current = 3200;
    speed.current = 0.9 
  }
 

// check for collision
  useEffect(()=>{
    if(Ydim.length ){
      if(Ydim[0].x > 610 && Xdim < 75){
        setGameOver(true)
        setcac(false)
      }
    }


  },[Ydim , Xdim])


//prevent multiple jumps

  useEffect(()=>{
    if(Xdim){
      setIsJumping(true)
    }else{
      setIsJumping(false)
    }
  },[Xdim])

  useEffect(() => {  
    const handleUp = (e) => {
      if (e.key == "ArrowUp" && !isJumping && !gameOver)  {

      jumpAnimation()          
      }

      if (e.key == "Enter" && !gameOver) {
       cactusAnimation();
       setStart(true);

      }
    };

    window.addEventListener("keydown", handleUp);

    return () => {
      window.removeEventListener("keydown", handleUp);
    };
  }, [isJumping,gameOver]);
  

  return (
    <div className="game justify-center items-center">
      <div
        className="dino "
        style={{
          bottom: Xdim + "px",
           backgroundImage : gameOver ? `url(${died})` : `url(${alive})`,
          animation : gameOver ?'' : 'run 1s ease-in-out infinite'
          
        }}
      ></div>

      
      {gameOver ? (
        <>
        <div>
          Game over 
          
        </div>
        <button onClick={restart} className="Restart">
            restart
          </button>
        </>
        
      ):(
<div>
  {  start ? (
    <div>
      <h3>
         the game is running
      </h3>
     
      </div>
  ):(
<div> 
  press enter to start
      </div>
  )
  
  }
</div>
      )}

      {discac ? (
        Ydim.map((c,index)=>(            
              <div
            key={index}
            className="cactus"
            style={{
              right: c.x+ "px",
              display : c.visible ? 'block' : 'none',
             

            }}
          ></div>
     
            
        ))
      ):(
        <div>
          
          </div>
      )}
    </div>
  )
}
export default Game;
