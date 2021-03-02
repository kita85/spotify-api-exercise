import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl: string;
  private market: string;
  private offset: number;
  private limit: number;

  constructor(private http: HttpClient) {
    // Set default parameters
    this.market = 'US';
    this.offset = 0;
    this.limit = 10;
   }

  // Get access token from Spotify to use API
  getAuth() {
    return this.http.get('http://localhost:8888/spotify-api-exercise/dist/spotify-api-exercise/getSpotifyToken.php');
  }

  // Get Track & Artist search results
  searchTrackArtist(query: string, authToken: string) {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&type=track%2Cartist&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;

    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get Artist Albums search results
  searchArtistAlbums(artistId: string, authToken: string) {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums?include_groups=single%2Cappears_on&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;
    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get Artist Tracks search results
  searchArtistTracks(artistId: string, authToken: string) {
    // Set Headers
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    // Request url based on user input
    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?market='+this.market;
    return this.http.get(this.searchUrl, { headers: headers });
  }

}