import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {
  const {storeTokenInLS}= useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
 

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await fetch(`https://technext-backend-fbo4.onrender.com/api/auth/login`,{
            mode:"no-cors",
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        })
        const res_data = await response.json();

        if(response.ok)
        {
            // console.log("response from server",res_data);
            //**********CHECK**********/
            storeTokenInLS(res_data.token);
            // localStorage.setItem("token",res_data.token);
            setUser({
                email: "",
                password: "",
              });
              navigate("/");
              alert("Login Successful");           
        }
        else{
            alert(res_data.extraDetails?res_data.extraDetails:res_data.message);
        }
    }
    catch(error)
    {
        console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/6.svg"
                  alt="a nurse with a cute look"
                  width="300"
                  height="300"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
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
                    Login
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