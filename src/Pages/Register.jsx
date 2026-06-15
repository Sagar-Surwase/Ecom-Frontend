import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Register.css";

function Register() {

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([0]);

    function onRegister(data) {

        console.log(data);

        axios.post("http://localhost:9091/user/register", data)
            .then(() => 
            {
                alert("Your Data is Registered Successfully");
                reset();

                navigate("/login");
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>LaptopHub</h1>
                <p>Create Your Account</p>

                <form onSubmit={handleSubmit(onRegister)}>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="input-field"
                        {...register("name")}
                    />

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

                    <input
                        type="number"
                        placeholder="Enter Mobile Number"
                        className="input-field"
                        {...register("mobile")}
                    />


                    <select
                        className="input-field"
                        {...register("role")}
                    >
                        <option value="">Select Role</option>
                        <option value="customer">CUSTOMER</option>
                        <option value="admin">ADMIN</option>
                    </select>

                    <select
                        className="input-field"
                        {...register("status")}
                    >
                        <option value="">Select Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>


                    <h3>Address Information</h3>

                    {addresses.map((item, index) => (

                        <div className="address-box" key={index}>

                            <input
                                type="text"
                                placeholder="Address Line"
                                className="input-field"
                                {...register(`addresses.${index}.addressLine`)}
                            />

                            <input
                                type="text"
                                placeholder="City"
                                className="input-field"
                                {...register(`addresses.${index}.city`)}
                            />

                            <input
                                type="text"
                                placeholder="State"
                                className="input-field"
                                {...register(`addresses.${index}.state`)}
                            />

                            <input
                                type="text"
                                placeholder="Pincode"
                                className="input-field"
                                {...register(`addresses.${index}.pincode`)}
                            />

                        </div>
                    ))}

                    <button
                        type="button"
                        className="add-btn"
                        onClick={() =>
                            setAddresses([...addresses, addresses.length])
                        }
                    >
                        + Add Address
                    </button>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                    <div className="register-links">
                        <Link to="/login">
                            Already have an account? Login
                        </Link>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default Register;