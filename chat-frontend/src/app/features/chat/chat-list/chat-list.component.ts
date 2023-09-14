import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable, debounceTime, first, map, switchMap, tap } from "rxjs";
import { Chat } from "src/app/core/interfaces/chat";
import { User } from "src/app/core/interfaces/user";
import { AuthService } from "src/app/core/services/auth.service";
import { ChatService } from "src/app/core/services/chat.service";
import { UserService } from "src/app/core/services/user.service";
import { authUser } from "src/app/store/auth/auth.selectors";
import { selectChat } from "src/app/store/chat/chat.actions";
import { getSelectedChat, isChatsLoaded, selectAllChats } from "src/app/store/chat/chat.selectors";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-chat-list",
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.scss"],
})
export class ChatListComponent {
  // true when divide line is visible
  showLine = false;

  isChatsLoaded: Observable<boolean> = this.store.select(isChatsLoaded);

  // fontawesome icon
  faSearch = faSearch;

  // users search control
  searchControl: FormControl = new FormControl("");

 @Output() popupOpen = new EventEmitter();

  // take list of chats
  userChats$ = this.store.select(selectAllChats);

  authUser$ = this.store.select(authUser) as Observable<User>;

  selectedChat$ = this.store.select(getSelectedChat)

  apiUrl = environment.apiUrlAuth
  
  isSearchUserLoading = true

  // users displayed in search field
  filteredAllUsers$: Observable<User[]> = this.authUser$.pipe(switchMap((authUser: User) =>{
 return this.searchControl.valueChanges.pipe(
  tap(()=> this.isSearchUserLoading = true),
    debounceTime(200),
    switchMap((value) => {
      return this.userService.searchUsersByLetter(value).pipe(
        map((users: User[]) => {
          this.isSearchUserLoading = false
          return users.filter((user: User) => user.email !== authUser.email);
        }),
      );
    }),
  );
}))
  
  constructor(private userService: UserService, private chatService: ChatService, private store: Store, private authService:AuthService) {}

  onChatSelectChange(chat: Chat) {
    this.store.dispatch(selectChat({ selectedChat: chat }));
  }

  //set selected chat when user is clicked in chat list search engine
  onUserSelect(recipientId: string, recipientName: string) {
    this.searchControl.setValue('')
    this.chatService
      .getOrCreateChat(recipientId, recipientName)
      .pipe(
        first(),
        tap((chat) => this.store.dispatch(selectChat({ selectedChat: chat }))),
      )
      .subscribe();
  }

  onScroll(e: Event) {
    const scrolledPixels = (e.target as Element).scrollTop;
    scrolledPixels > 0 ? (this.showLine = true) : (this.showLine = false);
  }

  sendFrameToRecipientUser(){
    this.chatService.sendFrameToRecipientUser()
  }

  onOpenPopup(){
    this.popupOpen.emit();
  }

  @HostListener('window:click', ['$event'])
  onWindowClick() {
this.isSearchUserLoading = true
  }

  logout(){
    this.authService.logout()
  }
}
