# Лабораторная работа №9  
Работа с внешними данными (API + React Hooks)

**Название выбранного мини-проекта**  
**GitHub User Finder** — поиск пользователя GitHub по логину с отображением профиля и списка репозиториев.

**Пример использованного API-запроса**  

### Профиль пользователя 
await fetch(`https://api.github.com/users/${username}`)

### Репозитории (по популярности) 
await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=12`)

### Скриншоты:

<img width="938" height="462" alt="image" src="https://github.com/user-attachments/assets/4b9a3794-8ddd-4363-8dfe-1cf2a917c2e3" />

<img width="900" height="844" alt="image" src="https://github.com/user-attachments/assets/2e7c78f6-bb0b-48b0-ae3d-abd8637249c7" />

<img width="1800" height="875" alt="image" src="https://github.com/user-attachments/assets/62416fd7-63f7-4f2d-8fce-283381f1eac2" />

<img width="1508" height="778" alt="image" src="https://github.com/user-attachments/assets/8481d1a8-32f3-4584-993e-2b810d3762ef" />

<img width="1631" height="742" alt="image" src="https://github.com/user-attachments/assets/06c3ff37-1af0-4eea-b4a3-2ca239ff13fa" />



### Ответы на вопросы:
1. Что делает useEffect в вашем приложении?  
   → В этой работе useEffect НЕ используется с пустым массивом, потому что загрузка происходит по кнопке (это допустимо по заданию). Но я знаю, как он работает — если бы грузили при загрузке страницы, поставили бы `useEffect(..., [])`.

2. Какие состояния вы использовали и зачем?  
   → `username`, `user`, `repos`, `loading`, `error`, `searchClicked` — для управления вводом, данными, загрузкой и ошибками.

3. Где ИИ помог, а где пришлось разбираться самому?  
   → ИИ (ты) помог написать весь код быстро и понятно. Сам проверял, что API работает и нет бесконечных запросов.

4. Что из документации API было важнее всего?  
   → Что при слишком частых запросах GitHub возвращает 403, и нужно подождать.







