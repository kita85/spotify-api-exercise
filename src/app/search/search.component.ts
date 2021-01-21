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
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(public searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getAuth().subscribe((res) => {
      console.log(res);
      this.token = res.toString();
    });
  }

  submit() {
    //console.log(this.searchForm.controls.search.value);
    this.searchService.searchTrackArtist(this.searchForm.controls.search.value,  this.token).subscribe((res) => {
      console.log(res);
      const output = res;
      this.artistOutput = output['artists']['items'];
      this.trackOutput = output['tracks']['items'];
    });
  }
}
