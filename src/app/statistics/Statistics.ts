export class Statistics {
  constructor(metering, day, cloud) {
    this.cloudId = cloud.cloudId;
    this.cloudName = cloud.cloudName;
    this.cpu = metering.cpu;
    this.gpu = metering.gpu;
    this.memory = metering.memory;
    this.disk = metering.disk;
    this.day = day;
    this.statisticsDay = metering.statisticsDay;
    this.statisticsTime = metering.statisticsTime;
    this.statisticsDayTime = metering.statisticsDay + ' ' + metering.statisticsTime;
  }

  cloudId;
  cloudName;
  cpu;
  disk;
  gpu;
  memory;
  day;
  statisticsDayTime;
  statisticsDay;
  statisticsTime;
}
