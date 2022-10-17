import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {faBuilding, faDollarSign, faMoneyBillWave} from '@fortawesome/free-solid-svg-icons';
import {exceptionBg, homeAlt, mobileDefault} from 'src/app/shared/providers/background';
import {SuggestionDTO} from 'src/app/shared/models/suggestion';
import {DebtService} from '../../providers/debt.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from 'src/app/shared/providers/loading/loading.service';
import {GoogleAnalyticsService} from 'src/app/shared/google-analytics/google-analytics.service';
import { MatDialog } from '@angular/material';
import { MailFormComponent } from 'src/app/shared/mail-form/components/mail-form/mail-form.component';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  public isNotFound : boolean = false;
  public isRedirect : boolean = false;
  public isTicket: boolean = false;
  public isDealFail: boolean = false;
  public isLoading: boolean = false;
  public isWidget = true;

  constructor(
    public dialog: MatDialog,
    private debtService: DebtService,
    private route: Router,
    private loading: LoadingService,
    private gaAnalytics: GoogleAnalyticsService
  ) {
  }
  ngOnInit() {
    this.loading.stopLoad();
    const par = this.route.url.split('=')[1]
    par == 'NotFound' ? this.isNotFound = true
                      : par == 'Redirect' ? this.isRedirect = true
                      : par == 'DealFail' ? this.isDealFail = true
                      : par == 'Loading' ? this.isLoading = true
                      : this.isTicket = true
  }
  public openMailForm() {
    this.gaAnalytics.eventEmitter('widget', 'mailOpen', 'openMailForm');
    const dialogRef = this.dialog.open(MailFormComponent, {
      width: '65%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gaAnalytics.eventEmitter('widget', 'mailClose', 'closeMailForm');
      //console.log(result);
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
}
