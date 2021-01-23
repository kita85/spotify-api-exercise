import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl: string;
  private clientId: string = 'aa050857df1b4347bf4e966f4154dba8';
  private clientSecret: string = 'a5e045c7cab346588913fc51608f5c50';

  constructor(private http: HttpClient) { }

  // Get access token from Spotify to use API
  getAuth() {
    return this.http.get('http://localhost:8888/spotify-api-exercise/dist/spotify-api-exercise/getSpotifyToken.php');
  }

  // Get search results for a query
  searchTrackArtist(query: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=10&type=track%2Cartist&market=US';

    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get search results for a query
  searchArtistAlbums(artistId: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums?include_groups=single%2Cappears_on&market=US&limit=10&offset=5';
    return this.http.get(this.searchUrl, { headers: headers });
  }

  // Get search results for a query
  searchArtistTracks(artistId: string, authToken: string) {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?market=US';
    return this.http.get(this.searchUrl, { headers: headers });
  }

}