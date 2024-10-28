import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken,getUsername,logout } from "./AuthHandler";
import '../styles/Homepage.css';
import Footer from '../components/Footer';

function Homepage(){

    const navigate=useNavigate();
    const [user, setUser] = useState('');
    const [bearer, setBearer] = useState('');
    const [loggedInUserName, setLoggedInUserName] = useState('Guest');
    const [food, setFood]=useState({});
    const [foods, setFoods]=useState([]);

    class FoodNutritionRequest{
        constructor(query){
            this.query=query;
        }
    };

    useEffect(() => {
        // Function to run on component load
        setUser(getUsername());
        if(getUsername() == null){
            alert('You were logged out, login again!!')
            navigate('/login');
        }
        setLoggedInUserName(getUsername()?.toUpperCase());
        setBearer(getToken());
        console.log(bearer);
    }, []);

    const logoutHandler = ()=>{
        logout();
        alert('logged out successfully!!');
        navigate('/login');
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const query = document.getElementById('query').value;
        
        if(query==""){
            alert("Fill the food name first..");
            return;
          }
        
        const foodNutritionRequest = new FoodNutritionRequest(query);
        console.log(foodNutritionRequest);
        try {
            const response = await fetch('http://localhost:9200/nutrition/v1/foodnutrition', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${bearer}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(foodNutritionRequest)
            })
            if(response.status == 401){
              alert("Token Expired, Please login Again..");
              navigate('/login');
            }
            else if (response.ok) {
              response.json().then((data)=>{
                setFood(data);
                document.getElementById("foods-container").style.display="none";
                document.getElementById("food-container").style.display="block";
              });
            }
            else {
              alert("Sorry, can't able to fetch info now.");
            }
          } catch (error) {
            console.error('Error: Fetching food nutrition', error);
          }

          // function displayData(data) {
          //   const food = data;
          //   const container = document.getElementById('food-container');
      
          //   const foodInfo = `
          //       <h6>Food: ${food.food_name}</h6>
          //       <p>Serving qty: ${food.serving_qty}</p>
          //       <p>Serving unit: ${food.serving_unit}</p>
          //       <p>Serving weight (grams): ${food.serving_weight_grams}</p>
          //       <p>Calories: ${food.nf_calories}</p>
          //       <p>Total fat: ${food.nf_total_fat}</p>
          //       <p>Saturated fat: ${food.nf_saturated_fat}</p>
          //       <p>Cholesterol: ${food.nf_cholesterol}</p>
          //       <p>Total Carbohydrate: ${food.nf_total_carbohydrate}</p>
          //       <p>Sugars: ${food.nf_sugars}</p>
          //       <p>Protein: ${food.nf_protein}</p>
          //       <p>Dietary Fiber: ${food.nf_dietary_fiber}</p>
          //   `;
      
          //   container.innerHTML = foodInfo;
          // }

    }

    const handleWishlist = async (e) => {
      e.preventDefault();
      const UserWishlist = {
          'username' : getUsername(),
          'item' : food.food_name
      };
      try {
        const response = await fetch('http://localhost:9200/wishlist/v1/save', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearer}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(UserWishlist)
        })
        if(response.status == 401){
          alert("Token Expired, Please login Again..");
          navigate('/login');
        }
        else if (response.ok) {
          alert('wishlisted successfully!!');
        }
        else {
          alert("Sorry, can't able to wishlist now.");
        }
      } catch (error) {
        console.error('Error: Fetching food nutrition', error);
      }
    };


    const handleAccessWishlist = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('http://localhost:9200/wishlist/v1/wishlisteditems/'+getUsername(), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${bearer}`,
            'Content-Type': 'application/json'
          }
        })
        if(response.status == 401){
          alert("Token Expired, Please login Again..");
          navigate('/login');
        }
        else if (response.ok) {
          response.json().then((data)=>{
            if(data == ''){
              alert('user wishlist is empty!!')
            }
            else{
              setFoods(data);
              document.getElementById("food-container").style.display="none";
              document.getElementById("foods-container").style.display="block";
            }
          });
        }
        else {
          alert("Sorry, can't able to fetch wishlist now.");
        }
      } catch (error) {
        console.error('Error: Fetching user wishlist', error);
      }

    }



    return(
        <div>
            <div className="header">
                <p className="logo">Nutritionix</p>
                <div className="header-right">
                    <div><button className='btn btn-outline-danger' type="button" onClick={logoutHandler}>Logout</button></div>
                    <div><h6>Welcome {loggedInUserName}</h6></div>
                </div>
            </div>
            <div>
                <div className='block'>
                <form>
                    <div className='row'>
                        <div className='col-8'>
                            <input type="text" id="query" className="form-control" placeholder="enter food to search nutritions" required />
                        </div>
                        <div className='col-4'>
                        <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>Search</button>
                        <button type="submit" className="btn btn-outline-warning" onClick={handleAccessWishlist}>Wishlist</button>
                        </div>
                    </div>
                    
                </form> 
                <div className="food-container" id="food-container">
        
                  <table>
                    <body>
                    <tr>
                        <th><button type="button" className='wishlist-btn' onClick={handleWishlist}>Wishlist</button></th>
                        <th>food:</th>
                        <th>{food.food_name}</th>
                        <th></th>
                      </tr>
                      <tr>
                        <td className='key'>Serving Quantity</td>
                        <td className='value'>{food.serving_qty}</td>
                        <td className='key'>Serving Unit</td>
                        <td className='value'>{food.serving_unit}</td>
                      </tr>
                      <tr>
                        <td className='key'>Serving Weight(grams)</td>
                        <td className='value'>{food.serving_weight_grams}</td>
                        <td className='key'>Calories</td>
                        <td className='value'>{food.nf_calories}</td>
                      </tr>
                      <tr>
                        <td className='key'>Total Fat</td>
                        <td className='value'>{food.nf_total_fat}</td>
                        <td className='key'>Saturated Fat</td>
                        <td className='value'>{food.nf_saturated_fat}</td>
                      </tr>
                      <tr>
                        <td className='key'>Cholesterol</td>
                        <td className='value'>{food.nf_cholesterol}</td>
                        <td className='key'>Total Carbohydrate</td>
                        <td className='value'>{food.nf_total_carbohydrate}</td>
                      </tr>
                      <tr>
                        <td className='key'>Sugars</td>
                        <td className='value'>{food.nf_sugars}</td>
                        <td className='key'>Protein</td>
                        <td className='value'>{food.nf_protein}</td>
                      </tr>
                    </body>
                  </table>
                </div>   
                <div className="foods-container" id="foods-container">
                  <p>your wishlist</p>
                  {foods.map((item, index) => (
                    // <li key={index}>
                    // <p>Name: {item.name}</p>
                    // <p>Age: {item.age}</p>
                    // </li>
                    <table>
                    <body>
                    <tr>
                        <th></th>
                        <th>food:</th>
                        <th>{item.food_name}</th>
                        <th></th>
                      </tr>
                      <tr>
                        <td className='key'>Serving Quantity</td>
                        <td className='value'>{item.serving_qty}</td>
                        <td className='key'>Serving Unit</td>
                        <td className='value'>{item.serving_unit}</td>
                      </tr>
                      <tr>
                        <td className='key'>Serving Weight(grams)</td>
                        <td className='value'>{item.serving_weight_grams}</td>
                        <td className='key'>Calories</td>
                        <td className='value'>{item.nf_calories}</td>
                      </tr>
                      <tr>
                        <td className='key'>Total Fat</td>
                        <td className='value'>{item.nf_total_fat}</td>
                        <td className='key'>Saturated Fat</td>
                        <td className='value'>{item.nf_saturated_fat}</td>
                      </tr>
                      <tr>
                        <td className='key'>Cholesterol</td>
                        <td className='value'>{item.nf_cholesterol}</td>
                        <td className='key'>Total Carbohydrate</td>
                        <td className='value'>{item.nf_total_carbohydrate}</td>
                      </tr>
                      <tr>
                        <td className='key'>Sugars</td>
                        <td className='value'>{item.nf_sugars}</td>
                        <td className='key'>Protein</td>
                        <td className='value'>{item.nf_protein}</td>
                      </tr>
                    </body>
                  </table>
                  ))}
                
                </div>       
                </div>
            </div>
            <div className='foot'><Footer /></div>
        </div>
    );
}
export default Homepage;