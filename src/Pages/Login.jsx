import { useForm } from "react-hook-form";
import "../CSS/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() 
{
   let{register, handleSubmit, reset} = useForm();

    function onLogin(data)
    {
      axios.get("http://localhost:9091/user/login/" +data.email+ "/" +data.password)
      .then((res)=>{

        console.log(res.data);

        alert("Login Successful");
      })
      .catch((errors)=> console.log(errors));
      
      
    }



  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LaptopHub</h1>
        <p>Welcome Back</p>

        <form onSubmit={handleSubmit(onLogin)}>
          <input
            type="email"
            placeholder="Enter Email"
            className="input-field"
            {...register("email")}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            {...register("password")}
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="login-links">
            <a href="#">Forgot Password?</a>
            <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;