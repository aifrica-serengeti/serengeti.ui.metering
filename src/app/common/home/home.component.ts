import {Component, OnInit, Optional} from '@angular/core';
import {LoginService} from '@serengeti/serengeti-common';
import {Subject} from 'rxjs';
import {Configurations} from '../../../Configuration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  themes = [] as string[];
  themeConfig: any;
  selectedTheme = 'light';

  config: Configurations;

  constructor(
    private loginService: LoginService,
    @Optional() config: Configurations
  ) {
    this.config = config;
    this.themeConfig = Configurations.getServiceContent(config).themeConfig;
    if (this.themeConfig) {
      // tslint:disable-next-line:forin
      for (const theme in this.themeConfig) {
        this.themes.push(theme);
      }
    }
    this.doChangeTheme('light');
  }

  doChangeTheme(theme: string) {
    this.selectedTheme = theme;
    Configurations.serviceTheme = this.selectedTheme;

    if (this.themeConfig[theme]) {
      const currentTheme = this.themeConfig[theme];

      document.documentElement.style.setProperty('--mainColor', currentTheme.mainColor);
      document.documentElement.style.setProperty('--contentColor', currentTheme.contentColor);
      document.documentElement.style.setProperty('--fontColor', currentTheme.fontColor);
      document.documentElement.style.setProperty('--underlineColor', currentTheme.underlineColor);
      document.documentElement.style.setProperty('--pointColor', currentTheme.pointColor);
      document.documentElement.style.setProperty('--borderColor', currentTheme.borderColor);
      document.documentElement.style.setProperty('--gridColor', currentTheme.gridColor);
      document.documentElement.style.setProperty('--hoverColor', currentTheme.hoverColor);
      document.documentElement.style.setProperty('--hoverFontColor', currentTheme.hoverFontColor);
      document.documentElement.style.setProperty('--buttonColor', currentTheme.buttonColor);
      document.documentElement.style.setProperty('--impactColor', currentTheme.impactColor);

      document.documentElement.style.setProperty('--toolbarBackgroundColor', currentTheme.toolbarBackgroundColor);
      document.documentElement.style.setProperty('--toolbarColor', currentTheme.toolbarColor);
      document.documentElement.style.setProperty('--toolbarSelectionColor', currentTheme.toolbarSelectionColor);
      document.documentElement.style.setProperty('--toolbarSelectionBackgroundColor', currentTheme.toolbarSelectionBackgroundColor);

      document.documentElement.style.setProperty('--selectedStateColor', currentTheme.selectedStateColor);
      document.documentElement.style.setProperty('--abnormalStateColor', currentTheme.abnormalStateColor);
      document.documentElement.style.setProperty('--incompleteStateColor', currentTheme.incompleteStateColor);
      document.documentElement.style.setProperty('--progressStateColor', currentTheme.progressStateColor);
      document.documentElement.style.setProperty('--completedStateColor', currentTheme.completedStateColor);

      document.documentElement.style.setProperty('--workflowBackground', currentTheme.workflowBackground);
      document.documentElement.style.setProperty('--workflowGrid', currentTheme.workflowGrid);

      document.documentElement.style.setProperty('--normalBorder', currentTheme.normalBorder);
      document.documentElement.style.setProperty('--startBorder', currentTheme.startBorder);
      document.documentElement.style.setProperty('--normalSelect', currentTheme.normalSelect);
      document.documentElement.style.setProperty('--startSelect', currentTheme.startSelect);
      document.documentElement.style.setProperty('--normalText', currentTheme.normalText);
      document.documentElement.style.setProperty('--startSelectText', currentTheme.startSelectText);
      document.documentElement.style.setProperty('--normalSelectText', currentTheme.normalSelectText);
      document.documentElement.style.setProperty('--normalBackground', currentTheme.normalBackground);
      document.documentElement.style.setProperty('--chainSelect', currentTheme.chainSelect);
      document.documentElement.style.setProperty('--chainBackground', currentTheme.chainBackground);

      (Configurations.getServiceThemeObserver(this.config) as Subject<any>).next(theme);

    } else {
      console.log('Invalid theme(' + theme + ') was set !!!');
    }
  }

  ngOnInit(): void {
  }
}
