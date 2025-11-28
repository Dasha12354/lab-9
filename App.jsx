import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  useEffect(() => {
    if (!username.trim()) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      setUser(null);
      setRepos([]);

      try {
       
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) {
          if (userRes.status === 404) throw new Error('Пользователь не найден');
          if (userRes.status === 403) throw new Error('Слишком много запросов, подождите минуту');
          throw new Error('Ошибка сервера');
        }
        const userData = await userRes.json();
        setUser(userData);

      
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=12`);
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim()); 
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub User Finder</h1>
        <p className="subtitle">Лабораторная работа №9 • Вариант C</p>
      </header>

      <main className="main">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Введите логин GitHub (например: octocat)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Найти
          </button>
        </form>

        {loading && <div className="loader">Загрузка...</div>}
        {error && <div className="error-box">{error}</div>}

        {user && (
          <div className="profile-card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <div className="info">
              <h2>{user.name || user.login}</h2>
              <p className="login">@{user.login}</p>
              {user.bio && <p className="bio">{user.bio}</p>}

              <div className="stats">
                <div className="stat">
                  <strong>{user.public_repos}</strong>
                  <span>Репозиториев</span>
                </div>
                <div className="stat">
                  <strong>{user.followers}</strong>
                  <span>Подписчиков</span>
                </div>
                <div className="stat">
                  <strong>{user.following}</strong>
                  <span>Подписок</span>
                </div>
              </div>

              <a href={user.html_url} target="_blank" rel="noreferrer" className="btn-primary">
                Открыть на GitHub
              </a>
            </div>
          </div>
        )}

        {repos.length > 0 && (
          <div className="repos-section">
            <h3>Лучшие репозитории ({repos.length})</h3>
            <div className="repos-grid">
              {repos.map(repo => (
                <div key={repo.id} className="repo-card">
                  <h4>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description || 'Нет описания'}</p>
                  <div className="repo-footer">
                    <span className="stars">⭐ {repo.stargazers_count}</span>
                    {repo.language && <span className="language">{repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
