import {Statistics} from './Statistics';

export class StatisticsExcel {
  constructor(meteringStatistics: Statistics) {
    this.CLOUD_NAME = meteringStatistics.cloudName;
    this.CPU = meteringStatistics.cpu;
    this.GPU = meteringStatistics.gpu;
    this.MEMORY = meteringStatistics.memory;
    this.DISK = meteringStatistics.disk;
    this.STATISTICS_DAY_TIME = meteringStatistics.statisticsDayTime;
  }

  CLOUD_NAME;
  CPU;
  GPU;
  MEMORY;
  DISK;
  STATISTICS_DAY_TIME;
}
