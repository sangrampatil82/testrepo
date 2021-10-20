import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table'
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../services/shared-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit {
  view2Data:any;
  mainData:any;
  searchUser:any;
  totalFollowersCount:number;
  totalFollowingCount:number;
  timeout: any = null;

  displayedColumns: string[];

  constructor(private fb:FormBuilder,private sharedService:SharedService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  formatD(datestr:string):string{
    let dateObj = new Date(datestr);
    let monthName = dateObj.toLocaleString("default", { month: "short" });
    let yearVal = dateObj.toLocaleString("default", { year: "numeric" });
    return monthName + " "+yearVal
  }

  getTotalFollowers(url:string):void
  {
    let totalFollowers;
      this.sharedService.getTotalFollowersCount(url).then((response:any)=>{
        totalFollowers = response.data.length;
        this.totalFollowersCount = totalFollowers;
      });
  }

  getTotalFollowings(url:string):void
  {
    let totalFollowing;
    let reformatUrl = url.substring(0, url.length-13);
      this.sharedService.getTotalFollowingCount(reformatUrl).then((response:any)=>{
        totalFollowing = response.data.length;
        this.totalFollowingCount = totalFollowing;
      });
  }

  showError(responseArr:any) {
    let errorMessage = (responseArr.length == 0)?"No data found":"Error fetching details"
    this.toastr.error(errorMessage, 'Major Error');
  }


  searchForUser(event:any) {
    clearTimeout(this.timeout);
    var $this = this;

    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.fetchDetails(event.target.value);
      }
    }, 1000);
  }

  fetchDetails(searchValue){
    let filterValue:any = searchValue;
    if(filterValue && filterValue != "")
    {
        this.searchUser = filterValue;
        this.sharedService.view2Searchtext = filterValue;
      this.sharedService.getUserDetails(this.sharedService.fetchUserPath+filterValue+'/repos').then((response:any)=>{
        this.displayedColumns= [ 'login','avatar_url','followers','following_count','size','created_at'];
        this.mainData = response.data;
        if(this.mainData.length == 0){
          this.showError(this.mainData);
          this.displayedColumns = [];
        }
        this.mainData.forEach((element:any)=>{
           this.getTotalFollowers(element.owner.followers_url);
           this.getTotalFollowings(element.owner.following_url);
        },
        (error:any)=>{
          this.showError(this.mainData);
          this.displayedColumns = [];
        })

      })
    }else{
      this.mainData = [];
      this.displayedColumns = [];
      this.sharedService.view2Searchtext = "";
    }
  }

}
