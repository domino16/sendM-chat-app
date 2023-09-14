import { NgModule } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatMessengerComponent } from "./chat-messenger/chat-messenger.component";
import { SharedModule } from "src/app/shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { chatReducer } from "src/app/store/chat/chat.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ChatEffects } from "src/app/store/chat/chat.effects";
import { RxStompService } from "src/app/core/services/rx-stomp.service";
import { rxStompServiceFactory } from "src/app/core/services/rx-stomp-factory.service";
import { ConversationInformationComponent } from "./conversation-information/conversation-information.component";
import { ChatRoutingModule } from "./chat-routing.module";


@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatMessengerComponent, ConversationInformationComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature("chat", chatReducer),
    EffectsModule.forFeature(ChatEffects),
    ChatRoutingModule,
  ],
  exports: [ChatComponent, ChatListComponent, ChatMessengerComponent, ConversationInformationComponent],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
})
export class ChatModule {}
