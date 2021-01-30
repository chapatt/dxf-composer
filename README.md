# dxf-composer

A simple DXF generation library.

## Usage

### Install
```shell
yarn add dxf-composer
```

### Import
```js
import { DxfDocument, DxfBlock } from 'dxf-composer';
```

### Entities

#### Document
```js
const dxfDocument = new DxfDocument(units);
```

#### Basic Entities
```js
dxfDocument.addLine(x1, y1, x2, y2, layer);
dxfDocument.addCircle(x, y, radius, layer);
dxfDocument.addArc(x, y, radius, startAngle, endAngle, layer);
````

#### Compound Entity Helpers
```js
dxfDocument.addRectangle(width, depth, x, y, layer);
dxfDocument.addRoundedRectangle(width, depth, radius, x, y, layer);
```

#### Dimensions
```js
dxfDocument.addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY, layer);
dxfDocument.addSimpleAlignedDimension(x1, y1, x2, y2, 'up', layer);
dxfDocument.addDiameterDimension(x1, y1, x2, y2, textX, textY, layer);
dxfDocument.addSimpleDiameterDimension(x, y, diameter, angle, layer);
```

#### Blocks
```js
const dxfBlock = new DxfBlock('aBlock');
dxfBlock.addRectangle(width, depth, x, y, layer);
dxfDocument.addBlock(dxfBlock);
dxfDocument.addBlockReference('aBlock', x, y, layer);
```

### Generate
```js
const dxfString = dxfDocument.toString();
```

## Development

### Project setup
```shell
yarn install
```

#### Compiles for development
```shell
yarn dev
```

#### Compiles and hot-reloads for development
```shell
yarn watch
```

#### Compiles and minifies for production
```shell
yarn prod
```
