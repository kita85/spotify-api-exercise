// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// Make class available to the application
@Injectable({
  providedIn: 'root'
})

/*
  The SearchService class contains all of the http requests.
  It is responsible for obtaining the authentication token as
  well as getting results from each API endpoint.

  @author Kita Cranfill
*/
export class SearchService {

  // Init variables
  private searchUrl: string;
  private market: string;
  private offset: number;
  private limit: number;

  /* 
    Bind HttpClient to the class and make it accessible to the component
  */
  constructor(private http: HttpClient) {
    // Set default parameters
    this.market = 'US';
    this.offset = 0;
    this.limit = 10;
   }

  /* 
    Get access token from Spotify to use API

    @return HTTP json response containing auth token
  */
  getAuth():Observable<Object> {
    return this.http.get('/spotify-api-exercise/dist/spotify-api-exercise/getSpotifyToken.php');
  }

  /* 
    Get Track & Artist search results

    @param query is a user input string
    @param authToken is a token string that is sent in the header of the http request, allowing access the api endpoint
    @return HTTP json response for artists and tracks
  */
  searchTrackArtist(query: string, authToken: string):Observable<Object> {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&type=track%2Cartist&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;

    return this.http.get(this.searchUrl, { headers: headers });
  }

  /* 
    Get Artist Albums search results 
    
    @param artistId string contains spotify's artist id which is obtained from searchTrackArtist()
    @param authToken is a token string that is sent in the header of the http request, allowing access the api endpoint
   @return HTTP json response for artist albums 
  */
  searchArtistAlbums(artistId: string, authToken: string):Observable<Object> {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums?include_groups=single%2Cappears_on&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;
    return this.http.get(this.searchUrl, { headers: headers });
  }

  /* 
    Get Artist Tracks search results 

    @param artistId string contains spotify's artist id which is obtained from searchTrackArtist()
    @param authToken is a token string that is sent in the header of the http request, allowing access the api endpoint
    @return HTTP json response for artist tracks
  */
  searchArtistTracks(artistId: string, authToken: string):Observable<Object> {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?market='+this.market;
    return this.http.get(this.searchUrl, { headers: headers });
  }

}
