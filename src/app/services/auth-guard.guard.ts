import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  jwtHelper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {


    // @ts-ignore
    const token: string = localStorage.getItem('jwt');

    if(token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if(!isRefreshSuccess) {
      this.router.navigate(['login']);
    }

    setInterval(() => {
      console.log('luka')
    }, 1000)

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');

    if(!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({ token: token, refreshToken: refreshToken});

    let isRefreshSuccess: boolean;

    try {
      const response = await this.http.post('https://localhost:44335/api/Auth/RefreshToken', credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }),
        observe: 'response'
      }).toPromise();
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess
  }

}
