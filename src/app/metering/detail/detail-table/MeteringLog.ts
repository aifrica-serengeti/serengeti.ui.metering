export class MeteringLog {
  constructor(metering: any) {
    this.meteringName = metering.meteringName;
    this.meteringType = metering.meteringType;

  }

  public setLogEntity(logEntity: {id, state, cpu, gpu, memory, disk, updateDate}) {
    this.id = logEntity.id;
    this.state = logEntity.state;
    this.cpu = logEntity.cpu;
    this.gpu = logEntity.gpu;
    this.memory = logEntity.memory;
    this.disk = logEntity.disk;
    this.updateDate = logEntity.updateDate;
  }

  id;
  meteringName;
  meteringType;
  state;
  cpu;
  gpu;
  memory;
  disk;
  updateDate;
}
