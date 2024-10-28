import '../styles/Registration.css'
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

function Registration(){
    const navigate=useNavigate();

    class UserInfo{
      constructor(username,password,email,address){
          this.username=username;
          this.password=password;
          this.email=email;
          this.address=address;
      }
    }

    const handleRouting = ()=> {
      navigate('/login');
  };

    const handleSubmit = async (e)=> {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      const address = document.getElementById('address').value;
      
      if(username=="" || password=="" || email=="" || address==""){
        alert("Fill required details first..");
        return;
      }
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailPattern.test(email)){
        alert("Enter a valid email");
        return;
      }
      if(username.length < 4 || password.length < 4){
        alert("Username and Password must contains atleast 4 digits");
        return;
      }
  
      const userInfo = new UserInfo(username,password,email,address);
  
      console.log(userInfo);
      try {
            const response = await fetch('http://localhost:9200/userservice/v1/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userInfo)
            })
            if(response.status === 208){
              alert('User with this email id already exists!');
            } 
            else if (response.ok) {
              alert('User Registered Successfully!!, you can login now :)');
              navigate('/login');
            }
            else {
              alert('Failed to register user, try again!!');
            }
      } catch (error) {
          console.error('Error: creating user', error);
      }
    }
    
    return(
        <div>
            <Header registration="active"/>
            <div className="registration">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label>Enter your Username:</label>
                        <input type="text" id="username" name="username" value={UserInfo.username}  className="form-control" placeholder="username"  required />
                    </div>
                    <div className="col">
                            <label>Enter your Password:</label>
                        <input type="password" id="password" name="password" value={UserInfo.password}  className="form-control" placeholder="password"  required />
                    </div>
                </div>
                <label>Enter your Email id:</label>
                <input type="email" id="email"  className="form-control" name="email" value={UserInfo.email} placeholder="email Id"  required />
                <label>Enter address:</label>
                <input type="address" id="address"  className="form-control" name="address" value={UserInfo.address} placeholder="address"  required />
                <div className="btns">
                    <div><button type="submit" className="btn btn-success" onClick={handleSubmit}>Register</button></div>
                    <div><button type="reset" id="reset-btn" className="btn btn-secondary">Reset</button></div>
                    <div className='loginlink'><p onClick={handleRouting}>already registered?...click here</p></div>
                </div>
                <br></br>
                <br></br>
            </form>
            </div>
            <br></br>
            <Footer />
        </div>
    );

}
export default Registration;
