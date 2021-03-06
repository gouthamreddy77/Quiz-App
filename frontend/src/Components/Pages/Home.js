import React,{useState,useEffect,createContext} from 'react'
import { Route ,Switch } from "react-router-dom";
import Login from "../User/Login"
import Register from '../User/Register';
import Home2 from './Home2';
import Createquiz from '../CREATE/Createquiz';
import Joinquiz from '../JOIN/Joinquiz';
import Dhome from '../Dashboard/Dhome'
import Navbar from "./Navbar"
import Responses from '../Dashboard/Responses';
export const AuthContext = createContext();

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [_id,set_id] = useState()
    const [email,setemail] =useState("")

    async function getLoggedIn() {
        const loggedInRes = await fetch("/user/loggedIn",{
            method:"GET"
        })
        const res = await loggedInRes.json()
        setLoggedIn(res.loggedin);
    }

    function setuserid( id ){
        set_id(id)
    }

    const setuseremail = (x) => {
        setemail(x);
    }

    useEffect(() => {
         getLoggedIn();
         console.log("getloggedin called");
      }, []);
    
      useEffect(() => {
        const persistentdata = localStorage.getItem('user-id')
        const data = localStorage.getItem('email-id')
        console.log("persistent",persistentdata);
        if(loggedIn === true && persistentdata !== null)
        { 
            console.log("2nd useeffect");
            set_id(JSON.parse(persistentdata)._id);
            setemail(JSON.parse(data).email);
        }
     }, [loggedIn]);


    return (
        <>
            <AuthContext.Provider value={{ loggedIn, _id,getLoggedIn ,setuserid ,setuseremail}}>   
                        <Switch>
                            <Route exact path="/">
                                <Register/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            {
                                loggedIn === true ?                           
                                    _id !==""?
                                    <>
                                    <Navbar email={email}/>
                                    <Route path="/home">
                                        <Home2/>
                                    </Route>
                                    <Route path="/dashboard">
                                        <Dhome/>
                                    </Route>
                                    <Route path="/create">
                                        <Createquiz/>
                                    </Route>
                                    <Route path="/join">
                                        <Joinquiz/>
                                    </Route>
                                    <Route path="/responses/:id">
                                        <Responses/>
                                    </Route>
                                    </>:<h1>loading....</h1>                            
                                :
                                    null
                            }
                           
                        </Switch>
            </AuthContext.Provider>
        </>
    )
}

export default Home