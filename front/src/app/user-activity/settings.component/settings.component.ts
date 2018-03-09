import {Component, OnInit} from "@angular/core";
import {Http} from '@angular/http';


@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit{
    message:string = 'hello';

    constructor(){}

    ngOnInit(){

    }

}