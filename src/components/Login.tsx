import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";


interface LoginProps{
    authService: AuthService
}

interface LoginState{
    userName: string,
    password: string,
    loginAttempt: boolean,
    loginSuccess: boolean
}

interface CustomerEvent{
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState>{

    state: LoginState ={
        userName:'',
        password:'',
        loginAttempt: false,
        loginSuccess: false
    }

    private setUserName(event :CustomerEvent){
        this.setState({userName: event.target.value})
        console.log(event.target.value)
    }

    private setPassword(event :CustomerEvent){
        this.setState({password: event.target.value})
        console.log(event.target.value)
    }

    private async handleSubmit(event : SyntheticEvent){
        event.preventDefault()
        this.setState({loginAttempt:true})
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if(result){
            this.setState({loginSuccess:true})
        } else {
            this.setState({loginSuccess:false})
        }
    }

    render(){
        let loginMessage : any
        if(this.state.loginAttempt){
            if(this.state.loginSuccess){
                loginMessage=<label>Login Success</label>
            } else {
                loginMessage=<label>Login Failed</label>
            }
        }
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange={e => this.setUserName(e)}/><br/>
                    <input value={this.state.password} type='password' onChange={e => this.setPassword(e)}/><br/>
                    <input type='submit' value='Login'/>
                </form>
                {loginMessage}
            </div>
        )
    }
}