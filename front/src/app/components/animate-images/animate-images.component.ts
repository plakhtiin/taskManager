import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-animate-images',
  templateUrl: './animate-images.component.html',
  styleUrls: ['./animate-images.component.scss'],
  animations: [
    trigger('firstImgState', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: '1'
      })),
      state('active', style({
        transform: 'scale(1.2)',
        opacity: '0.7'
      })),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
    trigger('secondImgState', [
      state('inactive', style({
        transform: 'rotate(0deg)'
      })),
      state('active', style({
        transform: 'rotate(180deg)'
      })),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
    trigger('thirdImgState', [
      state('inactive', style({
        transform: 'translate(0)'
      })),
      state('active', style({
        transform: 'translate(-354px)'
      })),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
    trigger('fourthImgState', [
      state('inactive', style({
        transform: 'translate(0) rotate(0)'
      })),
      state('active', style({
        transform: 'translate(354px, -154px) rotate(180deg)'
      })),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
    trigger('fifthImgState', [
      state('inactive', style({
        transform: 'translate(0)'
      })),
      state('active', style({
        transform: 'translate(-354px, -308px)'
      })),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ])
  ]
})
export class AnimateImagesComponent implements OnInit {
  stateFirst: string = 'inactive';
  stateSecond: string = 'inactive';
  stateThird: string = 'inactive';
  stateFourth: string = 'inactive';
  stateFifth: string = 'inactive';
  constructor() { }

  ngOnInit() {
  }

  public scaleImg() {
    this.stateFirst = this.stateFirst === 'active' ? 'inactive' : 'active';
  }
  public rotateImg() {
    this.stateSecond = this.stateSecond === 'active' ? 'inactive' : 'active';
  }
  public translateImg() {
    this.stateThird = this.stateThird === 'active' ? 'inactive' : 'active';
  }
  public toRightImg() {
    this.stateFourth = this.stateFourth === 'active' ? 'inactive' : 'active';
  }
  public toLeftImg() {
    this.stateFifth = this.stateFifth === 'active' ? 'inactive' : 'active';
  }
}
