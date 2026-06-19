import { useForm } from "react-hook-form";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() 
{
   let{register, handleSubmit, reset} = useForm();

   let navigate = useNavigate();

    function onLogin(data)
    {
      axios.get(`http://localhost:9091/user/login/${data.email}/${data.password}`)
      .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("userName", res.data.name);
          navigate("/");
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
            <p>Don't have an Account?</p>
            <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;