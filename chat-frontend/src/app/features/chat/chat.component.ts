import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { isSelectedChat } from "src/app/store/chat/chat.selectors";
import { ChatService } from "src/app/core/services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  isOpenChat:Observable<boolean> = this.store.select(isSelectedChat);
  isMobile = false;
  topicSubscription!: Subscription;
  isOpenConversationInformation = false;

  isOpenPopup = false;
  @Output() popupToggle: EventEmitter<boolean> = new EventEmitter();

  constructor( private store: Store,private chatService: ChatService){}

  ngOnInit(): void {
    this.onResize();  
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if(window.innerWidth < 960){
      this.isMobile = true;
      this.isOpenConversationInformation = false;
    }else this.isMobile = false;
  }

  visibilityConversationInformationBoxToggle() {
  this.isOpenConversationInformation = !this.isOpenConversationInformation
}

visibilityPoupToggle() {
  this.isOpenPopup = !this.isOpenPopup
}


sendFrameToRecipientUser(){
  this.chatService.sendFrameToRecipientUser()
}

}