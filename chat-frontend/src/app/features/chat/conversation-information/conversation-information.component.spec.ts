import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationInformationComponent } from './conversation-information.component';

describe('ConversationInformationComponent', () => {
  let component: ConversationInformationComponent;
  let fixture: ComponentFixture<ConversationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
