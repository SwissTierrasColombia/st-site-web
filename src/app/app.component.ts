import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// environment
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-base-structure';

  constructor(translate: TranslateService) {

    // set language default
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang(environment.languageSelected);

  }


}
