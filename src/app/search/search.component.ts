// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from './search.service';

// Mark class as a component and configure its metadata
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

/*
  The SearchComponent class is responsible for the HTTP requests. 
  It is also responsible for refreshing the Authentication token 
  to prevent negative user experience.

  @author Kita Cranfill
*/
export class SearchComponent implements OnInit {
  
  // Init variables
  token: string;
  artistOutput: object;
  trackOutput: object;
  artistTrackOutput: object;
  artistAlbumOutput: object;
  semicolonDetected: boolean;

  // Create a new reactive form
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });

  /* 
    Bind SearchService to the class and make it accessible to the component
  */
  constructor(public searchService: SearchService) { }

  /*
    ngOnInit() calls setauth() once Angular has initialized all data-bound
    properties.
  */
  ngOnInit():void {
    this.setAuth();
  }

  /* 
    setAuth() calls the getAuth http request, then subscribes to the response.
    Also start a timeout that calls the function again after 4.5 minutes.
    This prevents the token from going stale.
  */
  setAuth():void {
    const self = this; // quick scoping fix

    // Subscribe to Auth Token
    this.searchService.getAuth().subscribe((res) => {
      this.token = res.toString();

      // Refresh token before it expires in 5 minutes
      setTimeout(function(){ self.setAuth(); }, 4.5 * 60000); // 270000ms
    });
  }

  /* 
    submit() submits the users input to the searchTrackArtist http request, 
    then subscribes to the response.
  */
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

  /*
    searchArtistAlbumsTracks() submits the artistId to the searchArtistAlbums 
    http request, then subscribes to the response.

    @param artistId string contains spotify's artist id which is 
    obtained from the parsed result of submit()
  */
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

  /* 
    close() closes "More about this artist" popup
  */
  close():void {
    this.artistTrackOutput = null;
    this.artistAlbumOutput = null;
  }

  /* 
    omit_semicolon() prevents the user from being able to submit
    semicolons on the input field.
  */
  omit_semicolon(event):void {
    // if semicolon
    if (event.charCode == 59) {
      // prevent it from being typed and show user error
      event.preventDefault();
      this.semicolonDetected = true;
    } else {
      this.semicolonDetected = false
    }
    
  }
}
