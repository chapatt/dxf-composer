export default Base => class extends Base {
  constructor() {
    super();

    this.firstHandle = 0;
    this.nextHandle = 0;
    this.lines = [];
    this.circles = [];
    this.arcs = [];
    this.alignedDimensions = [];
    this.diameterDimensions = [];
  }

  _insertEntities(dxf) {
    this.lines.forEach(({ x1, y1, x2, y2, layer, color }) => {
      dxf.addLine(this.nextHandle++, x1, y1, x2, y2, layer, color);
    });
    this.circles.forEach(({ x, y, radius, layer }) => {
      dxf.addCircle(this.nextHandle++, x, y, radius, layer);
    });
    this.arcs.forEach(({ x, y, radius, startAngle, endAngle, layer }) => {
      dxf.addArc(this.nextHandle++, x, y, radius, startAngle, endAngle, layer);
    });
    this.alignedDimensions.forEach(({ x1, y1, x2, y2, extX, extY, textX, textY }) => {
      dxf.addAlignedDimension(this.nextHandle++, x1, y1, x2, y2, extX, extY, textX, textY);
    });
    this.diameterDimensions.forEach(({ x1, y1, x2, y2, textX, textY }) => {
      dxf.addDiameterDimension(this.nextHandle++, x1, y1, x2, y2, textX, textY);
    });
  }

  addLine(x1, y1, x2, y2, layer=null, color=null) {
    this.lines.push({ x1, y1, x2, y2, layer, color });
  }

  // x and y are bottom left corner
  addRectangle(w, h, x=0, y=0, layer=null) {
    this.addLine(x, y, x, y + h, layer);
    this.addLine(x, y + h, x + w, y + h, layer);
    this.addLine(x + w, y + h, x + w, y, layer);
    this.addLine(x + w, y, x, y, layer);
  }

  addRoundedRectangle(w, h, radius, x=0, y=0, layer=null) {
    this.addLine(x, y + radius, x, (y + h) - radius, layer);
    this.addArc(x + radius, (y + h) - radius, radius, 90, 180, layer);
    this.addLine(x + radius, y + h, (x + w) - radius, y + h, layer);
    this.addArc((x + w) - radius, (y + h) - radius, radius, 0, 90, layer);
    this.addLine(x + w, (y + h) - radius, x + w, y + radius, layer);
    this.addArc(x + radius, y + radius, radius,180, 270, layer);
    this.addLine((x + w) - radius, y, x + radius, y, layer);
    this.addArc((x + w) - radius, y + radius, radius,270, 360, layer);
  }

  addCircle(x, y, radius, layer) {
    this.circles.push({ x, y, radius, layer });
  }

  addArc(x, y, radius, startAngle, endAngle, layer) {
    this.arcs.push({ x, y, radius, startAngle, endAngle, layer });
  }

  // textX and textY are optional
  addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY, layer) {
    this.alignedDimensions.push({ x1, y1, x2, y2, extX, extY, textX, textY, layer });
  }

  addSimpleAlignedDimension(x1, y1, x2, y2, direction, layer) {
    let extX, extY;

    switch (direction) {
    case 'up':
      extX = x2;
      extY = y2 + 0.3125;
      break;
    case 'right':
      extX = x2 + 0.3125;
      extY = y2;
      break;
    case 'down':
      extX = x2;
      extY = y2 - 0.3125;
      break;
    case 'left':
      extX = x2 - 0.3125;
      extY = y2;
      break;
    }

    this.addAlignedDimension(x1, y1, x2, y2, extX, extY, null, null, layer);
  }

  // textX and textY are optional
  addDiameterDimension(x1, y1, x2, y2, textX, textY, layer) {
    this.diameterDimensions.push({ x1, y1, x2, y2, textX, textY, layer });
  }

  addSimpleDiameterDimension(x, y, diameter, angle, layer) {
    let x1, y1, x2, y2;

    const radius = diameter / 2;
    const angleRad = angle * (Math.PI / 180);
    const angleOppositeRad = angleRad + Math.PI;

    x1 = x + (radius * Math.cos(angleOppositeRad));
    y1 = y + (radius * Math.sin(angleOppositeRad));
    x2 = x + (radius * Math.cos(angleRad));
    y2 = y + (radius * Math.sin(angleRad));

    this.diameterDimensions.push({ x1, y1, x2, y2, textX: null, textY: null, layer });
  }
}