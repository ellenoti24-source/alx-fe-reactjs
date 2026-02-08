import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minRepos, setMinRepos] = useState("");

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
      // Step 1: search users with filters
      const data = await searchUsers(username, locationFilter, minRepos);

      // Step 2: fetch full profile for each user to get location
      const detailedUsers = await Promise.all(
        data.items.map(async (user) => {
          const details = await fetchUserData(user.login);
          return {
            ...user,
            location: details.location  "N/A",
            public_repos: details.public_repos  0,
          };
        })
      );

      setUsers(detailedUsers);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {users.map((user) => (
          <div key={user.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
            <img src={user.avatar_url} alt={user.login} width="80" />
            <p>Username: {user.login}</p>
            <p>Location: {user.location}</p>
            <p>Repositories: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;