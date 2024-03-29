import React from 'react';
import {User} from '../model/Model'
import {AuthService} from '../services/AuthService'
import { Login } from './Login';

interface AppState{
  user: User | undefined
}

export class App extends React.Component<{},AppState>{
  private authService : AuthService = new AuthService();
  render(){
    return(
      <div>
        App From Class Works
        <Login authService={this.authService}/>

      </div>
    )
  }
}

