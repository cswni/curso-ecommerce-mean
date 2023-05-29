import { Component, OnInit } from '@angular/core';

declare var $:any;
declare function HOMOINITTEMPLATE([]):any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ec';

  ngOnInit(): void{
    setTimeout(function (){
      HOMOINITTEMPLATE  ($);
    },50)
  }
}
