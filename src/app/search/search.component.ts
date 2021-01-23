import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  token: string;
  artistOutput: object;
  trackOutput: object;
  artistTrackOutput: object;
  artistAlbumOutput: object;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(public searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();
      console.log(this.token);
    });
  }

  setAuth():void {
    // Get Token
    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();
      console.log(this.token);
    });
  }

  submit() {
    //console.log(this.searchForm.controls.search.value);

    // Set New Token
    //this.setAuth();

    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();
      console.log(this.token);
    });

    // Get Results
    this.searchService.searchTrackArtist(this.searchForm.controls.search.value,  this.token).subscribe((res) => {
      console.log(res);

      this.artistOutput = res['artists']['items'];
      this.trackOutput = res['tracks']['items'];
    });
  }

  searchArtistAlbumsTracks(artistId:string) {
    // Set New Token
    //this.setAuth();

    // Get Album Results
    this.searchService.searchArtistAlbums(artistId,  this.token).subscribe((res) => {
      this.artistAlbumOutput = res['items'];
      console.log('searchArtistAlbums');
      console.log(this.artistAlbumOutput);
    });

    // Get Track Results
    this.searchService.searchArtistTracks(artistId,  this.token).subscribe((res) => {
      this.artistTrackOutput = res['tracks'];
      console.log('searchArtistTracks');
      console.log(this.artistTrackOutput);
    });
  }

  close():void {
    this.artistTrackOutput = null;
    this.artistAlbumOutput = null;
  }
}
