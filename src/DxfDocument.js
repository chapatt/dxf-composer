import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfDocument extends DxfEntitiesMixin(Object) {
  constructor(units=null) {
    super();

    this.units = units; // English or Metric
    this.blocks = [];
    this.blockReferences = [];
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginSection('HEADER');
      if (this.units) {
        dxf.addTag(9, '$MEASUREMENT');
        dxf.addTag(70, this.units === 'English' ? 0 : 1);
      }
      dxf.addTag(9, '$DIMASZ');
      dxf.addTag(40, 0.125);
      dxf.addTag(9, '$DIMAUNIT');
      dxf.addTag(70, 0);
      dxf.addTag(9, '$DIMEXO');
      dxf.addTag(40, 0.0625);
      dxf.addTag(9, '$DIMEXE');
      dxf.addTag(40, 0.25);
      dxf.addTag(9, '$DIMTXT');
      dxf.addTag(40, 0.125);
      dxf.addTag(9, '$DIMGAP');
      dxf.addTag(40, 0.0625);
    dxf.endSection(); // HEADER

    this.nextHandle = this.firstHandle;

    dxf.beginSection('BLOCKS');
      this.blocks.forEach((block) => {
        block.firstHandle = this.nextHandle;
        dxf.addRaw(block.toString());
        this.nextHandle = block.nextHandle;
      });
    dxf.endSection(); // BLOCKS
    dxf.beginSection('ENTITIES');
      this._insertEntities(dxf);
      this.blockReferences.forEach(({ name, x, y, layer }) => {
        dxf.addBlockReference(this.nextHandle++, name, x, y, layer);
      });
    dxf.endSection(); // ENTITIES
    dxf.endFile();

    return dxf.toString();
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  addBlockReference(name, x, y, layer='0') {
    this.blockReferences.push({ name, x, y, layer });
  }
}
