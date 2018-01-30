import { Component, OnInit } from '@angular/core';
import {MenusService} from '../services/menus.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
type:[Object];
Menu:[Object];
Count:[Number];
constructor(private MS: MenusService,private router: Router) {

 }

  ngOnInit() {

            this.Menu=this.MS.getMenu();


            this.Count=this.MS.getCount();

              this.MS.getType().subscribe(data => {
                if(data['success'])
                {
                  //console.log("hhh");
                this.type=data['type'];
                //console.log(data['menu']);
                //console.log(this.type);
                }


              });

  }

  //functions
  incrCount(index:number){
      this.Count[index]=(Number)(this.Count[index])+1;
      console.log(index + ":" + this.Count[index]);
  }


  decrCount(index:number)
  {
      if(this.Count[index]!=0)
      {
        this.Count[index]=(Number)(this.Count[index])-1;
        console.log(index + ":" + this.Count[index]);
      }
  }

  goToOrders(){
    this.MS.setOrders(this.Menu,this.Count);
    this.router.navigate(['/orders']);
  }

}