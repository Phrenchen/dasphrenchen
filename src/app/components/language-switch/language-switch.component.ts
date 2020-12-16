import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'dph-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.less']
})
export class LanguageSwitchComponent implements OnInit {

  languageCtrl: FormControl;
  languageForm: FormGroup;

  public siteLanguageCode = this.transloco.getActiveLang();
  public languageList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
  ];



  constructor(private fb: FormBuilder, private transloco: TranslocoService) {
    this.languageForm = this.fb.group({
      language: ['', []]
    });

    this.languageCtrl = this.languageForm.get('language') as FormControl;
   }

  ngOnInit(): void {
    this.languageCtrl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(result => {
        console.log('result', result);

        this.changeSiteLanguage(result.code);
      })
    ).subscribe();
  }
  // LIFE CYCLE end

  private changeSiteLanguage(language: string): void {
    this.transloco.setActiveLang(language);

    const nextLanguage: {code: string, label: string} | undefined = this.languageList.find(f => f.code === language);
    if(nextLanguage) {
      this.siteLanguageCode =nextLanguage.code;
    }
  }

}
