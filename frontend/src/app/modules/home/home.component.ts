import { Component, OnInit } from '@angular/core';

declare var $:any;
declare function HOMOINITTEMPLATE([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void{
    setTimeout(function (){
      HOMOINITTEMPLATE  ($);
    },50)
  }
}
