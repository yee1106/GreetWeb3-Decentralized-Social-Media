import {Moralis} from 'moralis'
import {useMoralisQuery} from 'react-moralis'


interface UserConstructor{
  greetUserName:string
}

export class GreetUser extends Moralis.User{


  constructor(args:UserConstructor){
    super(args)
  }
  
}

let test:GreetUser = Moralis.Object.extend("_User")