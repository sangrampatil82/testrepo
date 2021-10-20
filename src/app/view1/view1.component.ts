import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { DataSource } from '@angular/cdk/table';
import { FormBuilder,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {
  view1Data:any;
  mainData:any;
  searchRepo:any;

  displayedColumns: string[];

  constructor(private fb:FormBuilder,private sharedService:SharedService) { }

  ngOnInit(): void {
     if(this.sharedService.view1Searchtext){
       let obj:any = {
         target:{value: this.sharedService.view1Searchtext}
       }
       this.searchForRepo(obj);
     }
  }

  searchForRepo(event:any) {
    let filterValue:any = event.target.value;
    if(filterValue && filterValue != "")
    {
        this.searchRepo = filterValue;
        this.sharedService.view1Searchtext = filterValue;
      this.sharedService.getRepoDetails(this.sharedService.fetchReposPath+filterValue).then((response:any)=>{
        this.displayedColumns = [ 'name','owner','description','stargazers_count','clone_url'];
        this.mainData = response.data.items;
      })
    }else{
      this.mainData = [];
      this.displayedColumns = [];
      this.sharedService.view1Searchtext = "";
    }
  }

}
