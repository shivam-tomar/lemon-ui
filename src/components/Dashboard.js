import '../styles/Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';

function Dashboard(){
    const navigate=useNavigate();
    const buttonClick=()=>{
        navigate('./registration')
    }
    const buttonClick2=()=>{
        navigate('./login')
    }
    return (
    <div>
        <Header home="active"/>
        <div className='dashboard'>
            <div className='col'>
                <p>Welcome to our nutrition website, your go-to resource for all things related to healthy eating and balanced living. Whether you’re looking to improve your diet, find delicious and nutritious recipes, or understand the science behind the food you eat, we’ve got you covered. Our team of experts provides evidence-based advice and practical tips to help you make informed dietary choices.</p>
            </div>
        </div>
        <Footer/>
    </div>
    


    );
}
export default Dashboard;