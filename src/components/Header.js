import { Link } from "react-router-dom";
import '../styles/Header.css'

function Header(props){
    return(
        <div className="header">
            <p className="logo">Nutritionix</p>
            <div className="header-right">
                <Link className={props.home} to="/">Home</Link>
                <Link className={props.login} to="/login">Login</Link>
                <Link className={props.registration} to="/registration">Sign up</Link>
            </div>
        </div>
    );
}
export default Header;