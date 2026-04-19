export interface Vector2 { x: number; y: number; }
export interface Entity { pos: Vector2; vel: Vector2; render: (ctx: CanvasRenderingContext2D) => void; }

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  private running = false;

  constructor(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  addEntity(entity: Entity) { this.entities.push(entity); return this; }
  
  start() {
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.entities.forEach(e => {
        e.pos.x += e.vel.x; e.pos.y += e.vel.y;
        e.render(this.ctx);
      });
      requestAnimationFrame(loop);
    };
    loop();
  }
  
  stop() { this.running = false; }
}

export class Sprite {
  constructor(public image: string, public size: Vector2) {}
  render(ctx: CanvasRenderingContext2D, pos: Vector2) {
    ctx.fillStyle = this.image;
    ctx.fillRect(pos.x, pos.y, this.size.x, this.size.y);
  }
}
export default Game;
