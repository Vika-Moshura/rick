import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResultResponse } from 'src/app/shared/interfaces/IResult';
import { CharactersService } from 'src/app/shared/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  public userCharacters!: IResultResponse[];
  public searchValue!: string | null;
  public page = 1;
  public error = false;

  constructor(
    private charactersService: CharactersService,
    private toastr: ToastrService,
  ) {

  }
  ngOnInit(): void {
    this.error = false;
    if (localStorage.getItem('search')) {
      this.searchValue = JSON.parse(localStorage.getItem('search') as string);
    }
    if (localStorage.getItem('page')) {
      this.page = +JSON.parse(localStorage.getItem('page') as string);
    }
    this.getAll(this.page);
  }

  getAll(page: number): void {
    if (!this.searchValue) {
      this.charactersService.getAll(page).subscribe(data => {
        this.userCharacters = data.results;
        this.userCharacters.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
      }, () => {
        this.toastr.error("This is the last page");
      })
    }
    else if (this.searchValue) {
      this.charactersService.getFiltered(this.searchValue).subscribe(data => {
        this.userCharacters = data.results;
        this.userCharacters.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
      }, () => {
        this.toastr.error("This character isn't found");
        this.error = true;
      })
    }
  }

  filterCharacters(event: any): void {
    this.error = false;
    this.searchValue = event.target.value;
    localStorage.setItem('search', JSON.stringify(this.searchValue));
    this.charactersService.getFiltered(this.searchValue).subscribe(data => {
      this.userCharacters = data.results;
      this.userCharacters.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
    }, () => {
      this.toastr.error("This character isn't found");
      this.error = true;
    })
  }

  changePage(value: boolean): void {
    if (!value && this.page >= 2) {
      --this.page;
      localStorage.setItem('page', JSON.stringify(this.page));
      this.getAll(this.page);
    }
    if (value) {
      ++this.page;
      localStorage.setItem('page', JSON.stringify(this.page));
      this.getAll(this.page);
    }
  }

}
