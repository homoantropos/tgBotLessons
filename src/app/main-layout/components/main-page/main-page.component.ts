import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private _showMessageEditor = false;

  get showMessageEditor(): boolean {
    return this._showMessageEditor;
  }

  setShowMessageEditorFlag(showOrHide?: boolean): void {
    if(showOrHide) {
      this._showMessageEditor = showOrHide;
    } else {
      this._showMessageEditor = !this._showMessageEditor;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
