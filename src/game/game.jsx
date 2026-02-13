import React from "react";
import { useState, useEffect } from "react";
import "./game.css";

function Game() {
  const [isJumping, setIsJumping] = useState(false);
  const [Xdim, setXdim] = useState(0);

  const [discac, setcac] = useState(false);
  const [Ydim, setYdim] = useState([{x : 0 , visible : true}]);
  var start = false;
  function jumpAnimation() {
    var x = 0;
    var reached = false;

    const int = setInterval(() => {
      if (x == 50) {
        reached = true;
      }
      if (!reached) {
        x++;
      }

      if (reached) {
        x--;
      }
      if (x == 0) {
        clearInterval(int);
      }
      setXdim(x);
    }, 10);
  }
  function cactusAnimation() {
    setcac(true)
    const int = setInterval(() => {
      setYdim((prev)=> {
        return prev.map((c) => ({
          ...c,
          x: c.x <= 400 ? c.x ++ : c.x = c.x,
          visible: c.x + 1 < 400 ? true : false,
        }));
      });
    }, 10);
  }

  function addcactus() {
    let randomT = Math.random() * 100;
    console.log(randomT,Ydim);
    
    setTimeout(() => {
      var a = {x : 0 , visible : true};
      setYdim((arr) => [...arr, a]);
      console.log("added a cactus", Ydim);
    }, randomT);
  }

  useEffect(() => {
    const handleUp = (e) => {
      if (e.key == "ArrowUp" && start) {
        jumpAnimation();
      }

      if (e.key == "Enter") {
        cactusAnimation();
        start = true;
      }
    };

    window.addEventListener("keydown", handleUp);

    return () => {
      window.removeEventListener("keydown", handleUp);
    };
  }, []);

  return (
    <div className="game justify-center items-center">
      <div
        className="dino "
        style={{
          bottom: Xdim + "px",
        }}
      ></div>

      <button onClick={addcactus}> add a cactus</button>
      {discac ? (
        Ydim.map((c,index)=>(            
              <div
            key={index}
            className="cactus"
            style={{
              right: c.x+ "px",
              display : c.visible ? 'block' : 'none'
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
