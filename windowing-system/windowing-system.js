// @ts-check

function resize(width, height) {
  this.width = Math.max(width ?? 80, 1);
  this.height = Math.max(height ?? 60, 1);
}

export function Size(width, height) {
  resize.apply(this,[width,height]);
}

Size.prototype.resize = resize;

function move(x,y) {
  this.x = x;
  this.y = y;
}

function moveOffset(x,y) {
  this.x += x;
  this.y += y;
}

function ensureTopLeftOnscreen() {
  if (this.x < 0) this.x = 0;
  if (this.y < 0) this.y = 0;
}

export function Position(x, y) {
  this.x = x ?? 0
  this.y = y ?? 0
}

Position.prototype.moveOffset = moveOffset;
Position.prototype.move = move;
Position.prototype.ensureTopLeftOnscreen = ensureTopLeftOnscreen;

export function changeWindow(w) {
  w.move(new Position(100,150));
  w.resize(new Size(400,300));
  return w;
}

export class ProgramWindow {

  constructor() {
    this.size = new Size();
    this.position = new Position();
  }
  resize(size) {
    this.size = size;
    this.resizeIfTooLarge();
  }
  move(position) {
    this.position = position;
    this.position.ensureTopLeftOnscreen();
    this.moveOntoScreen();
  }
  isOffscreen() {
    return this.#isClippedBottom || this.#isClippedRight || this.position.x < 0 || this.position.y < 0
  }
  moveOntoScreen() {
    if (!this.isOffscreen()) return;

    let x = 0
    let y = 0;
    if (this.#isClippedRight) {
      const clippedBy = this.#rightX - this.screenSize.width;
      x = clippedBy;
    }
    if (this.#isClippedBottom) {
      const clippedBy = this.#bottomY - this.screenSize.height;
      y = clippedBy;
    }
    this.position.moveOffset(-x, -y);
    this.position.ensureTopLeftOnscreen();
  }
  resizeIfTooLarge() {
    if (this.#isClippedRight) {
      this.size.width = this.screenSize.width - this.position.x;
    }
    if (this.#isClippedBottom) {
      this.size.height = this.screenSize.height - this.position.y;
    }
  }

  get #isClippedBottom() {
    return this.#bottomY > this.screenSize.height
  }
  get #isClippedRight() {
    return this.#rightX > this.screenSize.width
  }
  get #rightX() {
    return this.position.x + this.size.width;
  }
  get #bottomY() {
    return this.position.y + this.size.height;
  }
  get screenSize() {
    return new Size(800,600);
  }
}

