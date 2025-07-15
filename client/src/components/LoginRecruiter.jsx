import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRecruiter = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state == "Sign Up" && !isTextDataSubmited) {
    return  setIsTextDataSubmited(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = axios.post(
          backendUrl + "/api/company/register",
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  /**
   * Quand je montre le login modal :

Bloque le défilement de la page
Et quand je le cache : 

Réactive le défilement
C’est très utile pour les modales
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    /**
     *backdrop-blur-sm : Applique un flou sur ce quil y a derrière cette div
     * bg-black/20:Couleur de fond noire avec opacité de 20%
     */
    <div className="absolute top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-fuchsia-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm text-center">
          Welcome Back 👋 ! Sign In to continue
        </p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="image upload"
                />
                <input
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>Upload Company Logo</p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-3 rounded-full mt-5">
                <img src={assets.person_icon} alt="person icon" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Enter Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-3 rounded-full mt-5">
              <img src={assets.email_icon} alt="email" />
              <input
                className="outline-none text-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="Enter Email Id"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-3 rounded-full mt-5">
              <img src={assets.lock_icon} alt="lock" />
              <input
                className="outline-none text-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                placeholder="Enter Your Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-fuchsia-600 mt-4 cursor-pointer">
            {" "}
            Forgot Password 😓 ?
          </p>
        )}

        <button
          type="submit"
          className="bg-fuchsia-600 text-white py-2 w-full rounded-full mt-5"
        >
          {state === "Login"
            ? "Login Here"
            : isTextDataSubmited
            ? "Create Account Now"
            : "Next ⏭️"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't Have An Account ?{" "}
            <span
              className="text-fuchsia-600 cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Register Here
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already Have An Account ?{" "}
            <span
              className="text-fuchsia-600 cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login Now
            </span>
          </p>
        )}

        <img
          onClick={(e) => {
            setShowRecruiterLogin(false);
          }}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt="cross"
        />
      </form>
    </div>
  );
};

export default LoginRecruiter;
