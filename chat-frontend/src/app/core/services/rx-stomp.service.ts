import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
  }

//     // Nadpisana metoda connect
//   connect(headers: StompHeaders = {}): void {
//     // Dodaj swoją własną logikę przed wywołaniem oryginalnej metody connect
//     console.log('Przed połączeniem');

//     // Wywołaj oryginalną metodę connect z klasy bazowej
//     super.connect(headers);

//     // Dodaj swoją własną logikę po wywołaniu oryginalnej metody connect
//     console.log('Po połączeniu');
//   }
// }
}