export class MeteringLog {
  constructor(metering: any) {
    this.meteringName = metering.meteringName;
    this.meteringType = metering.meteringType;
    this.id = metering.meteringLogEntityList[0].id;
    this.state = metering.meteringLogEntityList[0].state;
    this.cpu = metering.meteringLogEntityList[0].cpu;
    this.gpu = metering.meteringLogEntityList[0].gpu;
    this.memory = metering.meteringLogEntityList[0].memory;
    this.disk = metering.meteringLogEntityList[0].disk;
    this.updateDate = metering.meteringLogEntityList[0].updateDate;
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
