import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(user);
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md  border border-gray-100">
        <h1 className="text-3xl font-bold text-center  text-gray-300  ">
          Signup
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full  input input-bordered h-10 "
              type="text"
              placeholder="avantika"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full  input input-bordered h-10 "
              type="text"
              placeholder="avantika"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full  input input-bordered h-10 "
              type="password"
              placeholder="password"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full  input input-bordered h-10 "
              type="password"
              placeholder=" confirm-password"
            />
          </div>

          <div className="flex items-center  gap-10 my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="radio"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>

              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="radio"
              />
            </div>
          </div>
          <p className="text-center my-2">
            Already have an account?
            <Link to="/login">login</Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700 "
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
