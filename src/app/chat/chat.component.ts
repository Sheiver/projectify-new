import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatService} from '../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
// import {CdkTextareaAutosize} from '@angular/cdk/text-field';
// import {take} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private ngZone: NgZone
  ) { }

  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source); // .pipe(top(v => this.scrollBottom(v)));
    this.scrollBottom();
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('You need to enter something');
    }
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  // triggerResize() {
  //   this.ngZone.onStable.pipe(take(1))
  //     .subscribe(() => this.autosize.resizeToFitContent(true));
  // }
}
