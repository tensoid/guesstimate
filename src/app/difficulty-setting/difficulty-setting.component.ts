import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-difficulty-setting',
  templateUrl: './difficulty-setting.component.html',
  styleUrls: ['./difficulty-setting.component.scss']
})
export class DifficultySettingComponent implements OnInit {
    
  difficulties = ['easy', 'medium', 'hard'];

  ngOnInit(): void {
  }
}
