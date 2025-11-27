import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!username.trim()) {
      setError('Введите логин GitHub');
      return;
    }
    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Пользователь не найден');
        if (res.status === 403) throw new Error('Слишком много запросов, подождите');
        throw new Error('Ошибка сервера');
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=12`);
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setError('Не удалось загрузить репозитории');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub User Finder</h1>
        <p className="subtitle">Лабораторная работа №9 • Вариант C</p>
      </header>

      <main className="main">
        <div className="search-container">
          <input
            type="text"
            placeholder="Введите логин GitHub (например: octocat)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUser()}
          />
          <button onClick={fetchUser} className="search-btn">
            Найти
          </button>
        </div>

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

              <div className="actions">
                <a href={user.html_url} target="_blank" rel="noreferrer" className="btn-primary">
                  Открыть на GitHub
                </a>
                <button onClick={fetchRepos} className="btn-secondary" disabled={loading}>
                  {loading ? 'Загрузка...' : 'Репозитории'}
                </button>
              </div>
            </div>
          </div>
        )}

        {repos.length > 0 && (
          <div className="repos-section">
            <h3>Лучшие репозитории</h3>
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