import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { getSelectedChat } from "src/app/store/chat/chat.selectors";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-conversation-information",
  templateUrl: "./conversation-information.component.html",
  styleUrls: ["./conversation-information.component.scss"],
})
export class ConversationInformationComponent{
  apiUrl = environment.apiUrlAuth
  @Output() toggle = new EventEmitter();

  recipientUser$ = this.store.select(getSelectedChat).pipe(
    switchMap((chat) => this.userService.getUserByEmail(chat?.recipientId as string)));

  constructor(private store: Store, private userService: UserService, private http: HttpClient) {}

  onArrowClick() {
    this.toggle.emit();
  }
}
