import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./Login.module.scss";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Login component for user authentication.
 * @component
 */
export const Login = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginURL = `${API_URL}/auth/login`;
      const response = await fetch(loginURL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Login successful");

        // Save login data to local storage
        saveToLocalStorage("accessToken", result.accessToken);
        // Set the user data in the context
        setUser(result);

        router.push("/");
      } else {
        const errorResult = await response.json();
        toast.error(`Login error: ${errorResult.message}`);
      }
    } catch (error) {
      toast.error(`Login error: ${error.message}`);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.returnLink}>
        <Link href='/'>
          <FontAwesomeIcon icon={faReply} className={styles.icon} />
        </Link>
      </div>
      <h1>Login</h1>
      <form className={styles.login_form} onSubmit={handleLogin}>
        <input
          className={styles.login_input}
          type='email'
          placeholder='Email'
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className={styles.login_input}
          type='password'
          placeholder='Password'
          value={formData.password}
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className={styles.login_button} type='submit'>
          Login
        </button>
        <div className={styles.registerLink}>
          <Link href='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default Login;
