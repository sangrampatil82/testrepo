import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestPro';
  activeTab=""
  ngOnInit(){


  }

  activateTab(str:string){
    this.activeTab = str;
  }
}
