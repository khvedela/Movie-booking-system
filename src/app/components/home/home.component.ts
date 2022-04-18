import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesList: any;

  constructor(private movies: MoviesService, private auth: AuthService) { }

  getMovies() {
    this.movies.getMovies().subscribe((movies: {}) => {
      this.moviesList = movies;
    })
  }

  logoutUser() {
    this.auth.logout().subscribe()
    localStorage.removeItem('jwt')
    localStorage.removeItem('refreshToken')
  }

  ngOnInit(): void {
    this.getMovies();
    setTimeout(() => {
      console.log(this.moviesList)
    },1000);
  }

}
