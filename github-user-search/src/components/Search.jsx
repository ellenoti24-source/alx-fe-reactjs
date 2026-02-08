import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const res = await axios.get(
        https://api.github.com/search/users?q=${username}
      );
      setUsers(res.data.items); // ✅ Must be .items
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Map over users array */}
      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <img
                src={user.avatar_url}
                alt={user.login}
                width="80"
              />
              <p>{user.login}</p>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;