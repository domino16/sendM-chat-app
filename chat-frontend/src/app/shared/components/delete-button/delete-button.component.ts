import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  click(e: Event){
    const clickedItem = e.target as HTMLElement;
    const button = clickedItem.closest('button') as HTMLButtonElement;
    if(!button.classList.contains('delete')) {
      button.classList.add('delete');

      setTimeout(() => button.classList.remove('delete'), 3200);
  }
  e.preventDefault()
  }

}
