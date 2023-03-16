import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResultResponse } from 'src/app/shared/interfaces/IResult';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  public character!: IResultResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.character = response['characterInfo'];
    })
  }
}
