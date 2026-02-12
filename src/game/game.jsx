import React from "react";
import { useState, useEffect } from "react";
import "./game.css";

function Game() {
  const [isJumping, setIsJumping] = useState(false);
  const [Xdim, setXdim] = useState(0);

  const [discac, setcac] = useState(false);
  const [Ydim, setYdim] = useState(0);
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
    var y = 0;

    setcac(true);
    const int = setInterval(() => {
      if (y == 200) {
        setcac(false);
        clearInterval(int);
      }
      y++;
      setYdim(y);
    }, 10);
  }

  useEffect(() => {
    const handleUp = (e) => {
      console.log(e.key);
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
      {discac ? (
        <div
          className="cactus"
          style={{
            right: Ydim + "px",
          }}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Game;
