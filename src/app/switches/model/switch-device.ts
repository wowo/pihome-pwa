import {ScheduledEnum} from "./scheduled-enum";

export abstract class SwitchDevice {

  key: string;
  name: string;
  scheduled: ScheduledEnum;

  constructor(key: string, name: string, scheduled: ScheduledEnum) {
    this.key = key;
    this.name = name;
    this.scheduled = scheduled;
  }
}
