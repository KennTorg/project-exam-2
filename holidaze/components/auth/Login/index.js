import React, { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./Login.module.scss";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useUser } from "@/context/UserContext";

export const Login = () => {
  const router = useRouter();
  const { setUser } = useUser(); // Access the setUser function from the context
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
        alert("Login successful!");

        // Save login data to local storage
        saveToLocalStorage("accessToken", result.accessToken);

        if (result.userData) {
          // Save user data to local storage
          saveToLocalStorage("userData", JSON.stringify(result.userData));
        }

        // Set the user data in the context
        setUser(result);

        router.push("/");
      } else {
        const errorResult = await response.json();
        console.error("Login error:", errorResult.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.login_container}>
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
      </form>
    </div>
  );
};
