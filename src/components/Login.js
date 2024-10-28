import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import Footer from "./Footer";
import Header from "./Header";
import { setLoginValues, getToken } from "./AuthHandler";
import MainImg from '../images/foods.jpg';

function Login(){

    const navigate=useNavigate();

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    let [AuthRequest, setAuthRequest] = useState({
        username : '',
        password : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthRequest({
          ...AuthRequest,
          [name]: value
        });
        console.log(AuthRequest);
    };

    const handleRouting = ()=> {
        navigate('/registration');
    };

    const completeLogin = (token,username)=>{
      setToken(token);
      setUsername(username);
      console.log(token);
      setLoginValues(token,username);
      console.log(getToken());
      navigate('/homepage');
    };


    const handleSubmit= async (e)=> {
        e.preventDefault();
        
        console.log(AuthRequest);
        try {
            const response = await fetch('http://localhost:9200/auth/v1/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(AuthRequest),
              credentials: 'include'
            })
            if(response.status === 403){
              alert('Invalid username or password!');
            } 
            else if (response.ok) {
              alert('logged in successfully :)');
              response.json().then((data)=>{
                console.log(data.username);
                completeLogin(data.token,data.username);
              });
              
            }
            else {
              alert('Failed to login now!');
            }
          } catch (error) {
            console.error('Error: logging in user', error);
          }

    };

    return(
        <div>
            <Header login="active"/>
            <div className="login">
                <div className="login-grid">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <label>Enter your Username:</label>
                            <input type="text" id="username" name="username" value={AuthRequest.username} className="form-control" placeholder="username" required onChange={handleChange}/>
                            <label>Enter your Password:</label>
                            <input type="password" id="password"  className="form-control" placeholder="password" name="password" value={AuthRequest.password} required onChange={handleChange}/> 
                            <div className='btns'>
                                <div><button type="submit" className="btn btn-outline-success">Sign in</button></div>
                                <div className='registerlink'><p onClick={handleRouting}>not registered?...click here</p></div>
                            </div>
                        </form>

                    </div>
                    <div className="col">
                        <img src={MainImg} />
                    </div>
                </div>
            </div>
        </div>
        
    );

}
export default Login;