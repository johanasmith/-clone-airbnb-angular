import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() puntaje:number;

  public espacios: Array<number> = [1,2,3,4,5];

  constructor() { }

  ngOnInit(): void {
  }

}