import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, switchMap, take } from "rxjs";
import { Chat } from "../interfaces/chat";
import { Store } from "@ngrx/store";
import { authUser } from "src/app/store/auth/auth.selectors";
import { Message } from "../interfaces/message";
import { RxStompService } from "./rx-stomp.service";
import { getSelectedChat } from "src/app/store/chat/chat.selectors";
import { environment } from "src/environments/environment";

export interface createChatRequest {
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
}

@Injectable({
  providedIn: "root",
})
export class ChatService {
  url = environment.apiUrlChat;
  authUser$ = this.store.select(authUser);

  constructor(private http: HttpClient, private store: Store, private rxStompService:RxStompService) {}

  getChats(id: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url + "/chats/" + id );
  }

  getOrCreateChat(recipientId: string, recipientName: string): Observable<Chat> {
    return this.store.select(authUser).pipe(
      first(),
      switchMap((user) => {
        return this.http.post<Chat>(this.url + "/chats", {
          senderId: user?.email,
          senderName: user?.firstName,
          recipientId: recipientId,
          recipientName: recipientName,
        });
      }),
    );
  }

  getMessages(senderId: string, recipientId: string, limit: number):Observable<Message[]>  {
    return this.http.get<Message[]>(this.url + "/messages/" + senderId + "/" + recipientId + "/" + limit);

  }

  countReceivedMessages(senderId: string, recipientId: string) {
    return this.http.get(this.url + "/messages/count/" + senderId + "/" + recipientId);
  }

  deleteMessage(messageId: string) {
    return this.http.delete(this.url + "/messages/" + messageId);
  }

  //Send frame to recpipient user to set message as delivered
  sendFrameToRecipientUser(){
    this.store.select(getSelectedChat).pipe(take(1)).subscribe(chat => this.rxStompService.publish({ destination: "/app/messages", body: JSON.stringify({recipientId: chat?.recipientId as string})}))

  }
}
