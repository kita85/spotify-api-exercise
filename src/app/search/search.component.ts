import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  // Create reactive form
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  constructor(public searchService: SearchService) { }

  ngOnInit():void {
    this.setAuth();
  }

  setAuth():void {
    const self = this; // quick scoping fix

    // Subscribe to Auth Token
    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();

      // Refresh token before it expires in 5 minutes
      setTimeout(function(){ self.setAuth(); }, 4.5 * 60000); // 270000ms
    });
  }

  submit():void {
    // Make sure form is valid before submitting
    if(this.searchForm.valid) {
      // Subscribe to Search Results
      this.searchService.searchTrackArtist(this.searchForm.controls.search.value,  this.token).subscribe((res) => {
        // Store the results
        this.artistOutput = res['artists']['items'];
        this.trackOutput = res['tracks']['items'];
      });
    }
  }

  searchArtistAlbumsTracks(artistId:string):void {
    // Get Album Results
    this.searchService.searchArtistAlbums(artistId,  this.token).subscribe((res) => {
      // Store the results
      this.artistAlbumOutput = res['items'];
    });

    // Get Track Results
    this.searchService.searchArtistTracks(artistId,  this.token).subscribe((res) => {
      // Store the results
      this.artistTrackOutput = res['tracks'];
    });
  }

  // Close popup
  close():void {
    this.artistTrackOutput = null;
    this.artistAlbumOutput = null;
  }
}
