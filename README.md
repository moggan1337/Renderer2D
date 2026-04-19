# Renderer2D 🎮

**2D Game Engine** - Canvas-based rendering.

## Features

- **🎨 Entities** - Game objects
- **🔄 Game Loop** - 60 FPS rendering
- **🖼️ Sprites** - Image rendering
- **⚽ Physics** - Basic physics helpers

## Installation

```bash
npm install renderer2d
```

## Usage

```typescript
import { Game, Sprite, Vector2 } from 'renderer2d';

const game = new Game('#canvas');

game.addEntity({
  pos: { x: 100, y: 100 },
  vel: { x: 1, y: 0 },
  render: (ctx) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
  }
});

game.start();
```

## Entity Interface

```typescript
interface Entity {
  pos: Vector2;
  vel: Vector2;
  render: (ctx: CanvasRenderingContext2D) => void;
  update?: () => void;
}
```

## License

MIT
