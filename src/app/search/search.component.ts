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

  ngOnInit():void {
    this.setAuth();
  }

  setAuth():void {
    // Get Token
    const self = this;
    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();

      // Refresh token before it expires in 5 minutes
      setTimeout(function(){ self.setAuth(); }, 4.5 * 60000); // 270000ms
    });

    
  }

  submit():void {
    // Get Search Results
    this.searchService.searchTrackArtist(this.searchForm.controls.search.value,  this.token).subscribe((res) => {
      this.artistOutput = res['artists']['items'];
      this.trackOutput = res['tracks']['items'];
      console.log(res);
    });
  }

  searchArtistAlbumsTracks(artistId:string):void {
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
