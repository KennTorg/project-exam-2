import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./Register.module.scss";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useUser } from "@/context/UserContext";

export const Register = () => {
  const router = useRouter();
  const { setUser } = useUser(); // Access the setUser function from the context
  const [formData, setFormData] = useState({
    name: "", // Add the user's name field
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const registerURL = `${API_URL}/auth/register`;
      const response = await fetch(registerURL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("You are now registered!");

        // Save registration data to local storage, including the user's name
        saveToLocalStorage("userData", {
          ...result,
          name: formData.name,
        });

        // Set the user data in the context
        setUser(result);

        router.push("/login");
      } else {
        const errorResult = await response.json();
        console.error("Registration error:", errorResult.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.register_container}>
      <h1>Register</h1>
      <form className={styles.register_form} onSubmit={handleRegister}>
        <input
          className={styles.register_input}
          type='text'
          placeholder='Name'
          value={formData.name}
          pattern='^[\w]+$'
          maxLength={20}
          title='User name must only contain lower case and upper case letters, numbers, and underscore(_). Example: My_user1234'
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          className={styles.register_input}
          type='email'
          placeholder='Email'
          value={formData.email}
          pattern='^[\w\-.]+@(stud.)?noroff.no$'
          title='Only @(stud.)noroff.no domains are allowed to register.'
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          className={styles.register_input}
          type='password'
          placeholder='Password'
          value={formData.password}
          minLength={8}
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <input
          className={styles.register_input}
          type='url'
          placeholder='Avatar'
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        />

        <label>
          Venue Manager:
          <input
            type='checkbox'
            checked={formData.venueManager}
            onChange={(e) =>
              setFormData({ ...formData, venueManager: e.target.checked })
            }
          />
        </label>

        <button className={styles.register_button} type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};
