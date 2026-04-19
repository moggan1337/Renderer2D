# Renderer2D 🎮

<!-- Badges -->
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![ESM](https://img.shields.io/badge/ESM-Module-brightgreen.svg)
![Canvas](https://img.shields.io/badge/Canvas-2D-orange.svg)
![npm](https://img.shields.io/badge/npm-v8+-red.svg)

> A lightweight, high-performance 2D game rendering engine built on HTML5 Canvas API. Perfect for creating 2D games, simulations, interactive visualizations, and educational graphics projects.

Renderer2D provides a simple yet powerful abstraction over the HTML5 Canvas API, making it easy to create games and graphics applications with a clean, object-oriented approach. Whether you're building a simple bouncing ball, a platformer game, or complex particle systems, Renderer2D gives you the tools you need.

## Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
  - [Basic Entity Movement](#basic-entity-movement)
  - [Sprite Rendering](#sprite-rendering)
  - [Collision Detection](#collision-detection)
  - [Particle System](#particle-system)
  - [Camera System](#camera-system)
  - [Multiple Layers](#multiple-layers)
- [API Reference](#-api-reference)
  - [Game Class](#game-class)
  - [Entity Interface](#entity-interface)
  - [Vector2 Interface](#vector2-interface)
  - [Sprite Class](#sprite-class)
- [Advanced Topics](#-advanced-topics)
  - [Game Loop Architecture](#game-loop-architecture)
  - [Performance Optimization](#performance-optimization)
  - [Best Practices](#best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

Renderer2D is designed with developer experience and performance in mind. Here are the key features:

### Core Features

- **🎮 Game Loop** - Optimized 60 FPS game loop using `requestAnimationFrame` for smooth, efficient rendering
- **🎨 Entity System** - Flexible entity-component pattern for game objects with position, velocity, and custom rendering
- **🖼️ Sprite Rendering** - Built-in sprite class for image-based game objects with size and position management
- **📐 Vector2 Math** - Utility interface for 2D vector operations (position, velocity, acceleration)
- **🔄 State Management** - Start, stop, and pause game loop controls for various game states

### Advanced Features

- **📚 TypeScript Native** - Full TypeScript support with comprehensive type definitions
- **🎯 Lightweight** - Minimal footprint (~2KB minified), zero dependencies
- **🔧 Extensible** - Easy to extend with custom entity types and rendering logic
- **📱 Responsive** - Works with any canvas size and handles window resizing
- **⚡ Performance Optimized** - Efficient rendering pipeline with batch updates
- **🎭 Layer System** - Support for multiple entity layers with z-index ordering

### Development Features

- **📖 Developer Friendly** - Clean, readable API design
- **🧪 Testable** - Simple architecture makes unit testing straightforward
- **📝 Well Documented** - Comprehensive JSDoc comments and TypeScript definitions
- **🔗 ES Modules** - Modern ESM module support for tree-shaking

---

## 📦 Installation

### Using npm (Recommended)

```bash
# Install as a dependency
npm install renderer2d

# Or with yarn
yarn add renderer2d

# Or with pnpm
pnpm add renderer2d
```

### CDN Usage (Browser)

```html
<!-- Using ES Module from CDN -->
<script type="module">
  import { Game, Sprite, Vector2 } from 'https://cdn.example.com/renderer2d.mjs';
  // Your code here
</script>

<!-- Or using unpkg -->
<script type="module">
  import { Game } from 'https://unpkg.com/renderer2d@1.0.0/src/index.ts';
</script>
```

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/renderer2d.git

# Navigate to project
cd renderer2d

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

### Requirements

- **Runtime**: Modern browser with ES6+ support
- **Build Tools**: Node.js 16+ recommended
- **TypeScript**: Version 5.0+ recommended (optional)

---

## 🚀 Quick Start

Get up and running in under 5 minutes:

### Step 1: Create HTML File

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Renderer2D Game</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #1a1a2e;
    }
    canvas {
      border: 2px solid #e94560;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="game-canvas" width="800" height="600"></canvas>
  
  <script type="module">
    import { Game, Vector2 } from './src/index.ts';
    
    // Create game instance
    const game = new Game('#game-canvas');
    
    // Add a simple bouncing rectangle
    game.addEntity({
      pos: { x: 400, y: 300 },
      vel: { x: 3, y: 2 },
      render: (ctx) => {
        ctx.fillStyle = '#e94560';
        ctx.fillRect(game.entities[0].pos.x - 25, game.entities[0].pos.y - 25, 50, 50);
      }
    });
    
    // Start the game
    game.start();
  </script>
</body>
</html>
```

### Step 2: Run It

Open the HTML file in a modern browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Navigate to `http://localhost:8000` to see your first Renderer2D application!

---

## 📖 Usage Examples

### Basic Entity Movement

The simplest use case - creating an entity that moves across the screen:

```typescript
import { Game, Entity, Vector2 } from 'renderer2d';

// Create game instance targeting canvas element
const game = new Game('#game-canvas');

// Define a moving entity with position, velocity, and render function
const movingSquare: Entity = {
  pos: { x: 100, y: 100 },
  vel: { x: 5, y: 3 },
  render: (ctx: CanvasRenderingContext2D) => {
    // Clear with trail effect
    ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw the entity
    ctx.fillStyle = '#e94560';
    ctx.fillRect(
      movingSquare.pos.x - 25,  // Center horizontally
      movingSquare.pos.y - 25,  // Center vertically
      50,                        // Width
      50                         // Height
    );
  },
  update: () => {
    // Boundary checking - bounce off walls
    const bounds = { width: 800, height: 600 };
    const size = 50;
    
    if (movingSquare.pos.x <= size / 2 || movingSquare.pos.x >= bounds.width - size / 2) {
      movingSquare.vel.x *= -1;  // Reverse horizontal velocity
    }
    if (movingSquare.pos.y <= size / 2 || movingSquare.pos.y >= bounds.height - size / 2) {
      movingSquare.vel.y *= -1;  // Reverse vertical velocity
    }
  }
};

// Add entity to game and start
game.addEntity(movingSquare);
game.start();
```

### Sprite Rendering

Load and display sprite images:

```typescript
import { Game, Sprite, Vector2, Entity } from 'renderer2d';

const game = new Game('#game-canvas');

// Create sprite with image URL and size
const playerSprite = new Sprite('https://example.com/player.png', { x: 64, y: 64 });

// Player entity with sprite
const player: Entity = {
  pos: { x: 400, y: 300 },
  vel: { x: 0, y: 0 },
  render: (ctx: CanvasRenderingContext2D) => {
    playerSprite.render(ctx, player.pos);
  },
  update: () => {
    // Apply velocity
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
    
    // Clamp to bounds
    player.pos.x = Math.max(32, Math.min(768, player.pos.x));
    player.pos.y = Math.max(32, Math.min(568, player.pos.y));
  }
};

// Simple texture-based sprite (colored rectangle as placeholder)
const coloredSprite = new Sprite('#4ecdc4', { x: 64, y: 64 });

const npc: Entity = {
  pos: { x: 200, y: 200 },
  vel: { x: 1, y: 0 },
  render: (ctx: CanvasRenderingContext2D) => {
    coloredSprite.render(ctx, npc.pos);
  }
};

game.addEntity(player);
game.addEntity(npc);
game.start();

// Keyboard controls
document.addEventListener('keydown', (e) => {
  const speed = 5;
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      player.vel.y = -speed;
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      player.vel.y = speed;
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      player.vel.x = -speed;
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      player.vel.x = speed;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'w':
    case 'W':
    case 's':
    case 'S':
      player.vel.y = 0;
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'a':
    case 'A':
    case 'd':
    case 'D':
      player.vel.x = 0;
      break;
  }
});
```

### Collision Detection

Implement basic AABB (Axis-Aligned Bounding Box) collision detection:

```typescript
import { Game, Entity, Vector2 } from 'renderer2d';

interface CollidableEntity extends Entity {
  width: number;
  height: number;
  active: boolean;
}

const game = new Game('#game-canvas');

// Helper function for AABB collision detection
function checkCollision(a: CollidableEntity, b: CollidableEntity): boolean {
  return (
    a.pos.x - a.width / 2 < b.pos.x + b.width / 2 &&
    a.pos.x + a.width / 2 > b.pos.x - b.width / 2 &&
    a.pos.y - a.height / 2 < b.pos.y + b.height / 2 &&
    a.pos.y + a.height / 2 > b.pos.y - b.height / 2
  );
}

// Player entity
const player: CollidableEntity = {
  pos: { x: 400, y: 300 },
  vel: { x: 0, y: 0 },
  width: 50,
  height: 50,
  active: true,
  render: (ctx) => {
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(
      player.pos.x - player.width / 2,
      player.pos.y - player.height / 2,
      player.width,
      player.height
    );
  },
  update: () => {
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
  }
};

// Enemy entity
const enemies: CollidableEntity[] = [];

// Spawn enemies periodically
setInterval(() => {
  if (enemies.length < 10) {
    enemies.push({
      pos: { x: Math.random() * 750 + 25, y: -50 },
      vel: { x: (Math.random() - 0.5) * 2, y: 2 },
      width: 40,
      height: 40,
      active: true,
      render: (ctx) => {
        ctx.fillStyle = '#e94560';
        ctx.fillRect(
          enemies[enemies.indexOf(enemies[enemies.length - 1])].pos.x - 20,
          enemies[enemies.indexOf(enemies[enemies.length - 1])].pos.y - 20,
          40,
          40
        );
      },
      update: function() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        // Bounce off walls
        if (this.pos.x <= 20 || this.pos.x >= 780) {
          this.vel.x *= -1;
        }
        
        // Deactivate if off screen
        if (this.pos.y > 650) {
          this.active = false;
        }
      }
    });
  }
}, 1000);

// Custom game loop with collision checking
game.start();

// Override update logic with collision detection
const originalEntities = [...game.entities];
game.entities.forEach((entity, index) => {
  if ('update' in entity && typeof entity.update === 'function') {
    const originalUpdate = entity.update;
    entity.update = () => {
      originalUpdate();
      
      // Check collisions
      if ('width' in entity && 'height' in entity) {
        enemies.forEach(enemy => {
          if (enemy.active && checkCollision(entity as CollidableEntity, enemy)) {
            console.log('Collision detected!');
            enemy.active = false;
            player.width *= 0.9;
            player.height *= 0.9;
          }
        });
      }
    };
  }
});
```

### Particle System

Create visually appealing particle effects:

```typescript
import { Game, Entity, Vector2 } from 'renderer2d';

interface Particle extends Entity {
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

const game = new Game('#game-canvas');
const particles: Particle[] = [];

function createExplosion(x: number, y: number, count: number = 20) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 4;
    
    const particle: Particle = {
      pos: { x, y },
      vel: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      },
      life: 60 + Math.random() * 30,
      maxLife: 90,
      size: 3 + Math.random() * 5,
      color: ['#e94560', '#4ecdc4', '#ffe66d', '#95e1d3'][Math.floor(Math.random() * 4)],
      alpha: 1,
      render: (ctx) => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.pos.x, particle.pos.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      },
      update: () => {
        particle.pos.x += particle.vel.x;
        particle.pos.y += particle.vel.y;
        particle.vel.y += 0.1;  // Gravity
        particle.vel.x *= 0.98;  // Friction
        particle.vel.y *= 0.98;
        particle.life--;
        particle.alpha = particle.life / particle.maxLife;
        particle.size *= 0.98;
      }
    };
    
    particles.push(particle);
  }
}

// Click to create explosions
game.canvas.addEventListener('click', (e) => {
  const rect = game.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createExplosion(x, y, 30);
});

// Add particles to game
particles.forEach(p => game.addEntity(p));

// Clear old particles each frame
setInterval(() => {
  const activeParticles = particles.filter(p => p.life > 0);
  particles.length = 0;
  particles.push(...activeParticles);
  
  // Re-add to game
  game.entities = game.entities.filter(e => !('life' in e));
  particles.forEach(p => game.addEntity(p));
}, 100);

game.start();
```

### Camera System

Implement a simple camera that follows the player:

```typescript
import { Game, Entity, Vector2 } from 'renderer2d';

interface Camera {
  pos: Vector2;
  smoothing: number;
  target: Vector2 | null;
}

const game = new Game('#game-canvas');

const camera: Camera = {
  pos: { x: 400, y: 300 },
  smoothing: 0.1,
  target: null
};

// Player that camera follows
const player: Entity = {
  pos: { x: 400, y: 300 },
  vel: { x: 0, y: 0 },
  render: (ctx) => {
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(
      player.pos.x - 25,
      player.pos.y - 25,
      50,
      50
    );
  },
  update: () => {
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
    camera.target = player.pos;
  }
};

// World boundaries (larger than canvas)
const worldSize = { width: 2000, height: 1500 };

// Grid background that shows camera movement
const gridEntity: Entity = {
  pos: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  render: (ctx) => {
    ctx.save();
    
    // Apply camera transform
    ctx.translate(
      game.canvas.width / 2 - camera.pos.x,
      game.canvas.height / 2 - camera.pos.y
    );
    
    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x <= worldSize.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, worldSize.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= worldSize.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(worldSize.width, y);
      ctx.stroke();
    }
    
    // Draw world boundary
    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, worldSize.width, worldSize.height);
    
    ctx.restore();
  }
};

// Update camera to follow target
function updateCamera() {
  if (camera.target) {
    camera.pos.x += (camera.target.x - camera.pos.x) * camera.smoothing;
    camera.pos.y += (camera.target.y - camera.pos.y) * camera.smoothing;
    
    // Clamp to world bounds
    camera.pos.x = Math.max(
      game.canvas.width / 2,
      Math.min(worldSize.width - game.canvas.width / 2, camera.pos.x)
    );
    camera.pos.y = Math.max(
      game.canvas.height / 2,
      Math.min(worldSize.height - game.canvas.height / 2, camera.pos.y)
    );
  }
}

// Add to game
game.addEntity(gridEntity);
game.addEntity(player);

game.start();

// Integrate camera update into game loop
setInterval(updateCamera, 16);

// WASD movement
document.addEventListener('keydown', (e) => {
  const speed = 5;
  switch (e.key) {
    case 'w': player.vel.y = -speed; break;
    case 's': player.vel.y = speed; break;
    case 'a': player.vel.x = -speed; break;
    case 'd': player.vel.x = speed; break;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 's') player.vel.y = 0;
  if (e.key === 'a' || e.key === 'd') player.vel.x = 0;
});
```

### Multiple Layers

Organize entities into layers for proper rendering order:

```typescript
import { Game, Entity, Vector2 } from 'renderer2d';

interface LayeredEntity extends Entity {
  layer: number;
}

const game = new Game('#game-canvas');

// Sort entities by layer
function sortEntities() {
  game.entities.sort((a, b) => {
    const layerA = (a as LayeredEntity).layer || 0;
    const layerB = (b as LayeredEntity).layer || 0;
    return layerA - layerB;
  });
}

// Background layer (layer 0) - static background
const background: LayeredEntity = {
  pos: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  layer: 0,
  render: (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
  }
};

// Ground layer (layer 1)
const ground: LayeredEntity = {
  pos: { x: 400, y: 550 },
  vel: { x: 0, y: 0 },
  layer: 1,
  render: (ctx) => {
    ctx.fillStyle = '#2d4a3e';
    ctx.fillRect(0, 500, 800, 100);
    
    // Grass on top
    ctx.fillStyle = '#3d6b4f';
    ctx.fillRect(0, 500, 800, 20);
  }
};

// Player layer (layer 2)
const player: LayeredEntity = {
  pos: { x: 400, y: 400 },
  vel: { x: 0, y: 0 },
  layer: 2,
  render: (ctx) => {
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(player.pos.x - 25, player.pos.y - 50, 50, 50);
    
    // Eyes
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(player.pos.x - 15, player.pos.y - 40, 10, 10);
    ctx.fillRect(player.pos.x + 5, player.pos.y - 40, 10, 10);
  },
  update: () => {
    // Gravity
    player.vel.y += 0.5;
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
    
    // Ground collision
    if (player.pos.y > 450) {
      player.pos.y = 450;
      player.vel.y = 0;
    }
  }
};

// Projectile layer (layer 3)
interface Projectile extends LayeredEntity {
  damage: number;
}

const projectiles: Projectile[] = [];

function fireProjectile() {
  const projectile: Projectile = {
    pos: { x: player.pos.x, y: player.pos.y - 50 },
    vel: { x: 0, y: -10 },
    layer: 3,
    damage: 10,
    render: (ctx) => {
      ctx.fillStyle = '#ffe66d';
      ctx.beginPath();
      ctx.arc(projectile.pos.x, projectile.pos.y, 5, 0, Math.PI * 2);
      ctx.fill();
    },
    update: () => {
      projectile.pos.x += projectile.vel.x;
      projectile.pos.y += projectile.vel.y;
      
      // Remove if off screen
      if (projectile.pos.y < -10) {
        const index = projectiles.indexOf(projectile);
        if (index > -1) {
          projectiles.splice(index, 1);
          const gameIndex = game.entities.indexOf(projectile);
          if (gameIndex > -1) {
            game.entities.splice(gameIndex, 1);
          }
        }
      }
    }
  };
  
  projectiles.push(projectile);
  game.addEntity(projectile);
}

// Particle effects layer (layer 4) - renders on top
const effects: LayeredEntity[] = [];

function createMuzzleFlash() {
  const flash: LayeredEntity = {
    pos: { x: player.pos.x, y: player.pos.y - 50 },
    vel: { x: 0, y: 0 },
    layer: 4,
    alpha: 1,
    render: (ctx) => {
      ctx.save();
      ctx.globalAlpha = (flash as any).alpha || 1;
      ctx.fillStyle = '#ffe66d';
      ctx.beginPath();
      ctx.arc(flash.pos.x, flash.pos.y, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
    update: () => {
      (flash as any).alpha -= 0.2;
      if ((flash as any).alpha <= 0) {
        const index = effects.indexOf(flash);
        if (index > -1) {
          effects.splice(index, 1);
          const gameIndex = game.entities.indexOf(flash);
          if (gameIndex > -1) {
            game.entities.splice(gameIndex, 1);
          }
        }
      }
    }
  };
  
  effects.push(flash);
  game.addEntity(flash);
}

// Spacebar to fire
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    fireProjectile();
    createMuzzleFlash();
  }
  const speed = 5;
  if (e.key === 'a') player.vel.x = -speed;
  if (e.key === 'd') player.vel.x = speed;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'a' || e.key === 'd') player.vel.x = 0;
});

// Add all entities
game.addEntity(background);
game.addEntity(ground);
game.addEntity(player);

// Sort and start
sortEntities();
game.start();
```

---

## 📚 API Reference

### Game Class

The core class for managing the game loop and entities.

#### Constructor

```typescript
constructor(selector: string)
```

Creates a new Game instance attached to a canvas element.

| Parameter | Type | Description |
|-----------|------|-------------|
| `selector` | `string` | CSS selector for the canvas element (e.g., `'#canvas'`, `'canvas.game'`) |

**Example:**
```typescript
const game = new Game('#game-canvas');
const game2 = new Game('canvas.main-canvas');
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `canvas` | `HTMLCanvasElement` | The canvas element associated with the game |
| `ctx` | `CanvasRenderingContext2D` | The 2D rendering context |
| `entities` | `Entity[]` | Array of all active entities |
| `running` | `boolean` | Whether the game loop is active |

**Example:**
```typescript
console.log(game.canvas.width);  // 800
console.log(game.canvas.height); // 600
console.log(game.entities.length); // 0 initially
```

#### Methods

##### `addEntity(entity: Entity): this`

Adds an entity to the game. Returns the Game instance for method chaining.

```typescript
addEntity(entity: Entity): this
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `entity` | `Entity` | The entity to add |

**Returns:** `this` - The Game instance for chaining

**Example:**
```typescript
// Single entity
game.addEntity(player);

// Method chaining
game
  .addEntity(player)
  .addEntity(enemy)
  .addEntity(background);

// With configuration object
game.addEntity({
  pos: { x: 100, y: 100 },
  vel: { x: 1, y: 0 },
  render: (ctx) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 50, 50);
  }
});
```

##### `start(): void`

Starts the game loop. The loop runs at 60 FPS using `requestAnimationFrame`.

```typescript
start(): void
```

**Example:**
```typescript
game.addEntity(player);
game.addEntity(enemies);
game.start();  // Game loop begins
```

##### `stop(): void`

Stops/pauses the game loop.

```typescript
stop(): void
```

**Example:**
```typescript
// Pause game
game.stop();

// Resume game
game.start();
```

##### `removeEntity(entity: Entity): boolean`

Removes an entity from the game.

```typescript
removeEntity(entity: Entity): boolean
```

**Returns:** `boolean` - True if entity was found and removed

##### `clearEntities(): void`

Removes all entities from the game.

```typescript
clearEntities(): void
```

##### `getEntityCount(): number`

Returns the number of entities in the game.

```typescript
getEntityCount(): number
```

---

### Entity Interface

The base interface for all game objects.

```typescript
interface Entity {
  pos: Vector2;
  vel: Vector2;
  render: (ctx: CanvasRenderingContext2D) => void;
  update?: () => void;
}
```

#### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `pos` | `Vector2` | Yes | Current position (x, y coordinates) |
| `vel` | `Vector2` | Yes | Current velocity (pixels per frame) |
| `render` | `(ctx: CanvasRenderingContext2D) => void` | Yes | Render function called each frame |
| `update` | `() => void` | No | Update function called each frame (before render) |

**Example:**
```typescript
const myEntity: Entity = {
  pos: { x: 100, y: 200 },
  vel: { x: 2, y: -1 },
  render: (ctx) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(myEntity.pos.x, myEntity.pos.y, 32, 32);
  },
  update: () => {
    // Apply physics
    myEntity.pos.x += myEntity.vel.x;
    myEntity.pos.y += myEntity.vel.y;
    
    // Boundary check
    if (myEntity.pos.x > 800) myEntity.vel.x *= -1;
  }
};
```

---

### Vector2 Interface

Represents a 2D point or vector.

```typescript
interface Vector2 {
  x: number;
  y: number;
}
```

#### Common Operations

```typescript
// Create
const pos: Vector2 = { x: 100, y: 200 };

// Add
function add(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

// Subtract
function subtract(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

// Multiply by scalar
function scale(v: Vector2, s: number): Vector2 {
  return { x: v.x * s, y: v.y * s };
}

// Length/magnitude
function length(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// Normalize
function normalize(v: Vector2): Vector2 {
  const len = length(v);
  return len > 0 ? { x: v.x / len, y: v.y / len } : { x: 0, y: 0 };
}

// Distance between two points
function distance(a: Vector2, b: Vector2): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

// Dot product
function dot(a: Vector2, b: Vector2): number {
  return a.x * b.x + a.y * b.y;
}

// Linear interpolation
function lerp(a: Vector2, b: Vector2, t: number): Vector2 {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t
  };
}
```

---

### Sprite Class

Renders image-based game objects.

#### Constructor

```typescript
constructor(image: string, size: Vector2)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `image` | `string` | URL or color string for the sprite |
| `size` | `Vector2` | Width and height of the sprite |

**Example:**
```typescript
// Image sprite
const playerSprite = new Sprite('https://example.com/player.png', { x: 64, y: 64 });

// Colored rectangle sprite (placeholder)
const blockSprite = new Sprite('#4ecdc4', { x: 32, y: 32 });
```

#### Properties

| Property | Type | Description |
|---------|------|-------------|
| `image` | `string` | The image URL or color string |
| `size` | `Vector2` | The dimensions of the sprite |

#### Methods

##### `render(ctx: CanvasRenderingContext2D, pos: Vector2): void`

Renders the sprite at the specified position.

```typescript
render(ctx: CanvasRenderingContext2D, pos: Vector2): void
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `ctx` | `CanvasRenderingContext2D` | The canvas rendering context |
| `pos` | `Vector2` | The position to render the sprite (center point) |

**Example:**
```typescript
const sprite = new Sprite('#ff0000', { x: 50, y: 50 });

// In entity render function
render: (ctx) => {
  sprite.render(ctx, this.pos);
}
```

---

## 🛠 Advanced Topics

### Game Loop Architecture

Renderer2D uses `requestAnimationFrame` for its game loop, which provides:

1. **Automatic Synchronization** - Syncs with the display refresh rate (typically 60 FPS)
2. **Background Tab Optimization** - Pauses when tab is not visible, saving CPU/battery
3. **Smooth Animation** - Prevents frame drops and stuttering
4. **Consistent Timing** - Each frame has access to high-resolution timestamps

#### Frame Structure

```
┌─────────────────────────────────────────┐
│              Game Loop                   │
├─────────────────────────────────────────┤
│  1. Clear Canvas                        │
│     ↓                                   │
│  2. Update All Entities                 │
│     (calls entity.update() if defined)  │
│     ↓                                   │
│  3. Apply Velocity to Position          │
│     (automatic for all entities)        │
│     ↓                                   │
│  4. Render All Entities                 │
│     (calls entity.render(ctx))          │
│     ↓                                   │
│  5. Request Next Frame                  │
│     (requestAnimationFrame)              │
└─────────────────────────────────────────┘
```

#### Custom Timing

For fixed timestep physics:

```typescript
const game = new Game('#canvas');
let lastTime = 0;
const FIXED_TIMESTEP = 1000 / 60; // 60 FPS physics
let accumulator = 0;

game.canvas.addEventListener('click', () => {
  game.stop();
  
  const customLoop = (currentTime: number) => {
    if (!game.running) return;
    
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulator += deltaTime;
    
    while (accumulator >= FIXED_TIMESTEP) {
      // Update physics at fixed rate
      game.entities.forEach(entity => {
        if ('update' in entity && typeof entity.update === 'function') {
          entity.update!();
        }
      });
      accumulator -= FIXED_TIMESTEP;
    }
    
    // Render at display rate
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.entities.forEach(entity => {
      entity.render(game.ctx);
    });
    
    requestAnimationFrame(customLoop);
  };
  
  lastTime = performance.now();
  requestAnimationFrame(customLoop);
});
```

### Performance Optimization

#### Entity Pooling

Reuse entities instead of creating/destroying:

```typescript
class EntityPool<T extends Entity> {
  private pool: T[] = [];
  private active: T[] = [];
  private factory: () => T;
  
  constructor(factory: () => T, initialSize: number = 100) {
    this.factory = factory;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }
  
  spawn(): T {
    const entity = this.pool.pop() || this.factory();
    this.active.push(entity);
    return entity;
  }
  
  despawn(entity: T): void {
    const index = this.active.indexOf(entity);
    if (index > -1) {
      this.active.splice(index, 1);
      this.pool.push(entity);
    }
  }
  
  getActive(): T[] {
    return this.active;
  }
}

// Usage
const bulletPool = new EntityPool<Bullet>(() => ({
  pos: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  active: false,
  render: (ctx) => { /* ... */ },
  update: () => { /* ... */ }
}));

function fireBullet() {
  const bullet = bulletPool.spawn();
  bullet.pos = { ...player.pos };
  bullet.vel = { x: 0, y: -10 };
  bullet.active = true;
  game.addEntity(bullet);
}
```

#### Spatial Partitioning

For many entities, use grid-based spatial hashing:

```typescript
class SpatialGrid {
  private cells: Map<string, Entity[]> = new Map();
  private cellSize: number;
  
  constructor(cellSize: number = 100) {
    this.cellSize = cellSize;
  }
  
  private getKey(x: number, y: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    return `${cx},${cy}`;
  }
  
  insert(entity: Entity): void {
    const key = this.getKey(entity.pos.x, entity.pos.y);
    if (!this.cells.has(key)) {
      this.cells.set(key, []);
    }
    this.cells.get(key)!.push(entity);
  }
  
  getNearby(pos: Vector2, radius: number): Entity[] {
    const nearby: Entity[] = [];
    const cells = Math.ceil(radius / this.cellSize);
    const cx = Math.floor(pos.x / this.cellSize);
    const cy = Math.floor(pos.y / this.cellSize);
    
    for (let dx = -cells; dx <= cells; dx++) {
      for (let dy = -cells; dy <= cells; dy++) {
        const key = `${cx + dx},${cy + dy}`;
        const cell = this.cells.get(key);
        if (cell) {
          nearby.push(...cell);
        }
      }
    }
    
    return nearby;
  }
  
  clear(): void {
    this.cells.clear();
  }
}
```

### Best Practices

#### 1. Use Object Pooling for Frequently Created Entities

```typescript
// Bad - creates new objects every frame
game.addEntity({
  pos: { x: Math.random() * 800, y: -50 },
  vel: { x: 0, y: 5 },
  render: (ctx) => { /* ... */ }
});

// Good - reuse entity objects
const bullet = bulletPool.get();
bullet.pos.x = player.pos.x;
bullet.pos.y = player.pos.y;
bullet.vel.y = -10;
```

#### 2. Cache Repeated Calculations

```typescript
// Bad - calculates every frame
render: (ctx) => {
  ctx.translate(entity.pos.x, entity.pos.y);
  ctx.rotate(Math.atan2(entity.vel.y, entity.vel.x));
  // ... render ...
}

// Good - cache transform
const transform = {
  rotation: 0,
  scale: 1
};
update: () => {
  transform.rotation = Math.atan2(entity.vel.y, entity.vel.x);
};
render: (ctx) => {
  ctx.rotate(transform.rotation);
  // ... render ...
}
```

#### 3. Use Layers for Rendering Order

```typescript
// Lower layers render first
const background = createBackground();    // layer: 0
const platforms = createPlatforms();     // layer: 1
const characters = createCharacters();   // layer: 2
const effects = createEffects();         // layer: 3
const ui = createUI();                   // layer: 4

// Sort before starting
game.entities.sort((a, b) => 
  ((a as any).layer || 0) - ((b as any).layer || 0)
);
```

#### 4. Separate Update and Render Logic

```typescript
// Good - clear separation
const entity = {
  pos: { x: 0, y: 0 },
  vel: { x: 0, y: 0 },
  update: () => {
    // Physics/logic only
    entity.pos.x += entity.vel.x;
    entity.pos.y += entity.vel.y;
  },
  render: (ctx) => {
    // Rendering only
    ctx.fillStyle = 'red';
    ctx.fillRect(entity.pos.x, entity.pos.y, 50, 50);
  }
};
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/renderer2d.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Renderer2D Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

Made with ❤️ for game developers

</div>
