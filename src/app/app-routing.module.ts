import {Router, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./main-layout/components/main-page/main-page.component";
import {MessageEditorComponent} from "./main-layout/components/message-editor/message-editor.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: 'main', component: MainPageComponent, children: [
      {path: 'sendMedia', component: MessageEditorComponent}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
