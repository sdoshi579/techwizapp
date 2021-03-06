import { Component, OnInit } from '@angular/core';
import {ChefsService} from './chefs.service';
import {ChefSocketService} from './chef-socket.service';
import { Body } from '@angular/http/src/body';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
orderList:any[];
orderStatus:any[];
flag:any[];
public now: Date = new Date();
  constructor(private CS:ChefsService,private CSO:ChefSocketService) { 
    setInterval(() => {
      this.now = new Date();
    }, 60);
  }

  ngOnInit() {
    this.orderList=new Array();
    this.orderStatus=new Array();
    this.flag=new Array();
    this.CS.init();
    //this.orderList.push("hehe");
    /*this.CS.newOrder();
    this.OrderList=this.CS.getList();*/
    this.CSO
  .getOrders()
  .subscribe((order: any) => {
    console.log(order);
    this.orderList.push(order);
    this.flag.push(0);
    this.orderStatus[this.orderStatus.length]=new Array();
  });

  }
  sendStatus(i:any)
  {
    
    let orders=new Array();
    console.log(this.now);
    
    for(let j=0;j<this.orderList[i].orders.length;j++)
    {
      var t=new Date();
      t.setMinutes(t.getMinutes()+this.orderStatus[i][j]);
      console.log(t);
      let x={
        "foodName":this.orderList[i].orders[j].foodname,
        "Time":t
      };  
      orders.push(x);
      console.log(orders);
      console.log(this.orderStatus[i][j]);
    }
    let order={
      "userEmail":this.orderList[i].userEmail,
      "orderId":this.orderList[i].orderId,
      "orders":orders
    }
    this.CSO.sendOrderStatus(order);
    this.flag[i]=1;
  }

  OrderDeliverd(i:any)
  {
    this.flag[i]=2;
    this.CSO.sendDeliverdStatus(this.orderList[i].userEmail,this.orderList[i].orderId);
  }
  

}
