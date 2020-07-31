export default class Dxf {
  constructor() {
    this.data = "";
  }

  addRaw(data) {
    this.data += data;
  }

  addTag(groupCode, value) {
    this.data += `${groupCode}\n${value}\n`;
  }

  beginSection(name) {
    this.addTag(0, 'SECTION');
    this.addTag(2, name);
  }

  endSection() {
    this.addTag(0, 'ENDSEC');
  }

  endFile() {
    this.addTag(0, 'EOF');
  }

  beginTable(name) {
    this.addTag(0, 'TABLE');
    this.addTag(2, name);
  }

  endTable() {
    this.addTag(0, 'ENDTAB');
  }

  beginBlock(name, layer) {
    this.addTag(0, 'BLOCK');
    this.addTag(2, name);
    this.addTag(3, name);
    layer && this.addTag(8, layer);
    this.addTag(70, 0);
    this.addTag(10, 0);
    this.addTag(20, 0);
    this.addTag(30, 0);
  }

  endBlock() {
    this.addTag(0, 'ENDBLK');
  }

  addLine(handle, x1, y1, x2, y2, layer, color) {
    this.addTag(0, 'LINE');
    this.addTag(5, handle);
    layer && this.addTag(8, layer);
    color && this.addTag(62, color);
    this.addTag(10, x1);
    this.addTag(20, y1);
    this.addTag(30, 0);
    this.addTag(11, x2);
    this.addTag(21, y2);
    this.addTag(31, 0);
  }

  addBlockReference(handle, name, x, y, layer) {
    this.addTag(0, 'INSERT');
    this.addTag(5, handle);
    this.addTag(2, name);
    layer && this.addTag(8, layer);
    this.addTag(10, x);
    this.addTag(20, y);
    this.addTag(30, 0);
  }

  addCircle(handle, x, y, radius, layer) {
    this.addTag(0, 'CIRCLE');
    this.addTag(5, handle);
    layer && this.addTag(8, layer);
    this.addTag(10, x);
    this.addTag(20, y);
    this.addTag(30, 0);
    this.addTag(40, radius);
  }

  addArc(handle, x, y, radius, startAngle, endAngle, layer) {
    this.addTag(0, 'ARC');
    this.addTag(5, handle);
    layer && this.addTag(8, layer);
    this.addTag(10, x);
    this.addTag(20, y);
    this.addTag(30, 0);
    this.addTag(40, radius);
    this.addTag(50, startAngle);
    this.addTag(51, endAngle);
  }

  addAlignedDimension(handle, x1, y1, x2, y2, extX, extY, textX, textY, layer) {
    this.addTag(0, 'DIMENSION');
    this.addTag(5, handle);
    this.addTag(70, 1);
    this.addTag(13, x1);
    this.addTag(23, y1);
    this.addTag(33, 0);
    this.addTag(14, x2);
    this.addTag(24, y2);
    this.addTag(34, 0);
    this.addTag(10, extX);
    this.addTag(20, extY);
    this.addTag(30, 0);
    if (textX && textY) {
      this.addTag(11, textX);
      this.addTag(21, textY);
      this.addTag(31, 0);
    }
    layer && this.addTag(8, layer);
  }

  addDiameterDimension(handle, x1, y1, x2, y2, textX, textY, layer) {
    this.addTag(0, 'DIMENSION');
    this.addTag(5, handle);
    this.addTag(70, 3);
    this.addTag(15, x1);
    this.addTag(25, y1);
    this.addTag(35, 0);
    this.addTag(10, x2);
    this.addTag(20, y2);
    this.addTag(30, 0);
    if (textX && textY) {
      this.addTag(11, textX);
      this.addTag(21, textY);
      this.addTag(31, 0);
    }
    layer && this.addTag(8, layer);
  }

  toString() {
    return this.data;
  }
}