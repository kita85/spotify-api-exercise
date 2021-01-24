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
    this.market = 'US';
    this.offset = 0;
    this.limit = 10;
   }

  // Get access token from Spotify to use API
  getAuth() {
    return this.http.get('http://localhost:8888/spotify-api-exercise/dist/spotify-api-exercise/getSpotifyToken.php');
  }

  // Get search results for a query
  searchTrackArtist(query: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&type=track%2Cartist&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;

    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get search results for a query
  searchArtistAlbums(artistId: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums?include_groups=single%2Cappears_on&market='+this.market+'&offset='+this.offset+'&limit='+this.limit;
    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get search results for a query
  searchArtistTracks(artistId: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?market='+this.market;
    return this.http.get(this.searchUrl, { headers: headers });
  }

}