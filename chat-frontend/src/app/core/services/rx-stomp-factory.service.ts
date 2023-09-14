import { rxStompConfig } from '../config/rx-stomp.config';
import { RxStompService } from './rx-stomp.service';


export function rxStompServiceFactory() {
  if (typeof window !== 'undefined') {
    const rxStomp = new RxStompService();
    rxStomp.configure(rxStompConfig);
    rxStomp.activate();
    return rxStomp;
  } else {
    return null;
  }
}