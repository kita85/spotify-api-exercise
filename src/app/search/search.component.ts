import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
    alert(this.searchForm.controls.search.value);
  }
}
