import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { MailFormComponent } from '../../mail-form/components/mail-form/mail-form.component';
import { GoogleAnalyticsService } from '../../google-analytics/google-analytics.service';
import { AuthService } from '../../providers/user/auth.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  animations: [
    trigger('spin', [
        transition(':enter', [
          style({top: '-25%', opacity: 0}),
          animate(500, style({top: 0, opacity: 1})),
      ]),
      transition(':enter', [
        style({top: 0, opacity: 1}),
        animate(500, style({top: '-25%', opacity: 0})),
     ])
    ])
  ]
})
export class WidgetComponent implements OnInit {
  public isWidget = true;

  constructor(
    public dialog: MatDialog,
    private gaAnalytics: GoogleAnalyticsService,
    public auth: AuthService
  ) { }

  public openMailForm() {
    this.gaAnalytics.eventEmitter('widget', 'mailOpen', 'openMailForm');
    const dialogRef = this.dialog.open(MailFormComponent, {
      width: '65%',
      data: null,
     // panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gaAnalytics.eventEmitter('widget', 'mailClose', 'closeMailForm');
    });
  }

  public openWidget() {
    this.isWidget = !this.isWidget;
    if (!this.isWidget) {
      this.gaAnalytics.eventEmitter('widget', 'open', 'openWidget');
    } else {
      this.gaAnalytics.eventEmitter('widget', 'close', 'closeWidget');
    }
  }

  ngOnInit() {
  }
}
