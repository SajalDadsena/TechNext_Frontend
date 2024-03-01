import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Register = () => {
    const {storeTokenInLS}= useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

 const navigate= useNavigate();
 

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async(e) => {
    try
    {e.preventDefault();
    console.log(user);
    const response = await fetch(`https://technext-backend-fbo4.onrender.com/api/auth/register`,{
        mode:"no-cors",
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    }
    );

    const res_data = await response.json();
    console.log("response from server",res_data);

    if(response.ok){
        //*****Check this******************************** 
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token",res_data.token);
        setUser(
            {
                username: "",
                email: "",
                phone: "",
                password: "",
            }
        );
        navigate("/");
        alert("Registration Successful")
    }
    else{
        alert(res_data.extraDetails?res_data.extraDetails:res_data.message);
    }
    console.log(response);
    }
    catch(error)
    {
        console.log("register",error);
    }
  };


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/7.svg"
                  alt="a nurse with a cute look"
                  width="300"
                  height="300"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"

                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};