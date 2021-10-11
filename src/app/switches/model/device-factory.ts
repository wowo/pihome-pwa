import {SwitchDevice} from "./switch-device";
import {EthernetSwitch} from "./ethernet-switch";
import {TwoWaySwitch} from "./two-way-switch";
import {RaspberrySwitch} from "./raspberry-switch";
import {ClickSwitch} from "./click-switch";

export class DeviceFactory {
  static create(specs: any): SwitchDevice | undefined {
    switch (specs.type) {
      case 'ethernet':
        return new EthernetSwitch(specs.key, specs.name, specs.scheduled);
      case 'two_way':
        return new TwoWaySwitch(specs.key, specs.name, specs.scheduled);
      case 'raspberry':
        return new RaspberrySwitch(specs.key, specs.name, specs.scheduled);
      case 'click':
        return new ClickSwitch(specs.key, specs.name, specs.scheduled);
      default:
        return undefined;
    }
  }
}
