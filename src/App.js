import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./styles.css";

// const emails = [".biz", ".tv", ".net"];

export default function App() {
  const [user, setUser] = useState([]);
  const [emailDomain, setEmailDomain] = useState([]);

  const getDomain = (data) => {
    const emails = data.map((u) => {
      const data = u.email.split(".");
      return data[data.length - 1];
    });
    const unique = [...new Set(emails)];
    return unique;
  };

  const fetchData = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await data.json();
      setUser(json);
      const emailDomains = getDomain(json);
      setEmailDomain(emailDomains);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterEmail = (e) => {
    const filteredEmail = user.filter((u) => u.email.includes(e.target.value));
    setUser(filteredEmail);
    const emailDomains = getDomain(filteredEmail);
    setEmailDomain(emailDomains);
  };

  return (
    <div className="App">
      <select onChange={filterEmail} name="cars" id="cars">
        <option disabled default>
          Select any email domain
        </option>
        {emailDomain.map((e, ind) => (
          <option key={ind} value={e}>
            {e}
          </option>
        ))}
      </select>
      <button onClick={fetchData}>reset</button>
      <div className="user-container">
        {user.map((u) => (
          <UserCard key={u.id} userData={u} />
        ))}
      </div>
    </div>
  );
}
