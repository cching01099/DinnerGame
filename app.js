const total_items = 8;
const minimum_moves = 30;
let current_index = 0;
let moves = 0;
let speed = 30;
let timer = 0;
let dinner = 0;
const dinners = {
  0: "🍛",
  1: "🍔",
  2: "🍣",
  3: "🍲",
  4: "🥗",
  5: "🍝",
  6: "🍕",
  7: "🥘",
};

function runCircle() {
  const squareElements = document.querySelectorAll("[index]");
  squareElements[current_index].classList.remove("is-active");

  current_index += 1;
  if (current_index > total_items - 1) {
    current_index = 0;
  }

  squareElements[current_index].classList.add("is-active");
}

function generateDinnerNum() {
  return Math.floor(Math.random() * total_items);
}

function speedControl() {
  moves += 1;
  // stop the game -> get the dinner
  if (moves > minimum_moves + 10 && dinner === current_index) {
    dinner = 0;
    moves = 0;
    clearTimeout(timer);
    //sweet alert is async func
    swal({
      title: `The Dinner is ${dinners[current_index]}`,
      text: "Let's Cook & Eat!",
      icon: "success",
    });
    // alert(`The Dinner is ${dinners[current_index]}`);
  } else {
    //keep running
    runCircle(); //current_index keep updating
    if (moves < minimum_moves) {
      //speed up the game
      speed -= 5;
      //decide the final dinner's location
    } else if (moves === minimum_moves) {
      const randomNum = generateDinnerNum();
      dinner = randomNum;
    } else {
      //the next dinner is the right one, then speed slow
      if (moves > minimum_moves + 10 && dinner === current_index + 1) {
        speed += 60;
      } else {
        speed += 20;
      }
    }

    if (speed < 40) {
      speed = 40;
    }
    timer = setTimeout(speedControl, speed);
  }
}

const init = () => {
  moves = 0;
  speed = 100;
  dinner = 0;
  speedControl();
};

const start = document.getElementById("start-btn");
start.addEventListener("click", init);
