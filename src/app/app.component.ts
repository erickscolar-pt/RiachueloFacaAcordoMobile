import { Component } from '@angular/core';
import { LoadingService } from './shared/providers/loading/loading.service';
import { AuthService } from './shared/providers/user/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Tools } from 'src/app/shared/tools';

declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public loading: LoadingService,
    public auth: AuthService,
    public router: Router
  ) {
    this.appendGaTrackingCode();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  title = 'ATMATEC';

  private appendGaTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '` + environment.googleAnalyticsKey + `', 'auto');
      `;
      document.head.appendChild(script);
    } catch (ex) {
     console.error('Error appending google analytics');
     console.error(ex);
    }
  }
}
