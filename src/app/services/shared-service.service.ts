import { Injectable } from '@angular/core';
import { environmentDetails } from 'src/app/environments/environment';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  domain = environmentDetails.baseUrl;
  view1Searchtext = "";
  view2Searchtext = "";
  public fetchReposPath = this.domain + 'search/repositories?q='
  public fetchUserPath = this.domain + 'users/'
  constructor() { }

  getRepoDetails(repoPath:string){
    return axios.get(repoPath);
  }

  getUserDetails(userPath:string){
    return axios.get(userPath);
  }

  getTotalFollowersCount(path:string){
    return axios.get(path);
  }

  getTotalFollowingCount(path:string){
    return axios.get(path);
  }

}


