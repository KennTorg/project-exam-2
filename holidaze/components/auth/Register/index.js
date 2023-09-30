import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./Register.module.scss";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

/**
 * Register component for user registration.
 * @returns {JSX.Element} The Register component.
 */
export const Register = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
  });

  /**
   * Handles user registration.
   * @param {React.SyntheticEvent} e - The form submission event.
   */
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
        toast.success("You are now registered!");

        saveToLocalStorage("userData", {
          ...result,
          name: formData.name,
        });

        setUser(result);

        router.push("/login");
      } else {
        const errorResult = await response.json();
        toast.error("Registration error: " + errorResult.message);
      }
    } catch (error) {
      toast.error("Registration error: " + error.message);
    }
  };

  return (
    <div className={styles.register_container}>
      <div className={styles.returnLink}>
        <Link href='/'>
          <FontAwesomeIcon icon={faReply} className={styles.icon} />
        </Link>
      </div>
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

        <div className={styles.venueManagerBox}>
          <label>
            <input
              type='checkbox'
              checked={formData.venueManager}
              onChange={(e) =>
                setFormData({ ...formData, venueManager: e.target.checked })
              }
            />
            Venue Manager
          </label>
        </div>

        <button className={styles.register_button} type='submit'>
          Register
        </button>
        <div className={styles.loginLink}>
          <Link href='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};
