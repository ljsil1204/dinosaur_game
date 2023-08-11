const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); // 렌더링 컨텍스트와 그리기 함수 사용 할수 있음.

// ctx.fillStyle = "rgb(200, 0, 0)"; // 캔버스 색상
// ctx.fillRect(10, 10, 100, 100); // 캔버스 직사각형 fillRect(x,y,width,height)
// ctx.strokeRect(10, 10, 100, 100); // 캔버스 선 직사각형
// ctx.clearRect(10, 10, 10, 10); // 캔버스 특정영역 지움

const roadImg = new Image();
roadImg.src = "img/road.png";

canvas.width = 400;
canvas.height = 256;

const dinoImg = new Image();
dinoImg.src = "img/dino.png";

// 공룡 높이와 폭
const dino = {
  x: 20,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "#00000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dinoImg, this.x, this.y);
  },
};

dino.draw();

const cactusImg = new Image();
cactusImg.src = "img/cactus.png";

class Cactus {
  constructor() {
    this.x = 400;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "#00000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImg, this.x, this.y);
  }
}

const cactus = new Cactus();
cactus.draw();

let timer = 0;
let cactues = [];
let isJump = false;
let animationFrame;
let jumpTimer = 0;

const animate = () => {
  animationFrame = requestAnimationFrame(animate); // 애니메이션 실행
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 240 === 0) {
    const cacuts = new Cactus();
    cactues.push(cacuts);
  }

  cactues.forEach((c, i, thisCactues) => {
    if (c.x < 0) {
      thisCactues.splice(i, 1);
    }

    for (let i = 0; i < 3; i++) {
      c.x--;
    }

    checkCrash(dino, c);

    c.draw();
  });

  if (isJump) {
    // 점프 올라가는 중

    for (let i = 0; i < 5; i++) {
      dino.y--;
      jumpTimer++;
    }
  } else if (dino.y < 200) {
    // 점프 내려가는중
    for (let i = 0; i < 2; i++) {
      dino.y++;
    }
  }

  if (dino.y < 100) {
    isJump = false;
  }

  if (jumpTimer > 100) {
    isJump = false;
    jumpTimer = 0;
  }

  dino.draw();
};

const checkCrash = (dino, cactus) => {
  // 충돌날 때
  let xDiff = cactus.x - (dino.x + dino.width);
  let yDiff = cactus.y - (dino.y + dino.height);

  if (xDiff < 0 && yDiff < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animationFrame);
  }
};

animate();

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    isJump = true;
  }
});
