import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Http} from '@angular/http';
import {LoginService} from '../../services/loginService';
export class UserLogIn{
    email: string;
    password: string;
}

@Component({
    selector: 'log-in',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LogInComponent implements OnInit{
    userLogIn: UserLogIn = new UserLogIn();

    constructor(private loginService : LoginService){
        this.userLogIn.email = '';
        this.userLogIn.password = '';
    }

    @Output() userLogin = new EventEmitter();

    ngOnInit(){
        this.loginService.getToken()
        //     .then(function (data) {
        //     if (data) {
        //         // $state.go('start');
        //         // $location.path('/start');
        //     }
        // });
    }

    onSubmit(){
        let userToken:string = this.loginService.login(this.userLogIn.email ,this.userLogIn.password);
        this.userLogin.emit(userToken);
            // .then(function (data) {
            //     // $state.go('start');
            // }, function (err) {
            //
            // });
        console.log('log in!')
    }

}