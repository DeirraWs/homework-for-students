/*
Отримання та відображення завдання з API:
Редагувати App компонент, 
який виконує запит до API https://jsonplaceholder.typicode.com/todos/1
і відображає дані завдання.

Вимоги:
- Використати useEffect для виконання запиту при першому рендері компонента.
- Створити три стани за допомогою useState:
    - task — для збереження отриманого завдання;
    - error — для обробки помилок при запиті;
    - loading — для індикації завантаження даних.
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - інформацію про завдання, коли task успішно отриманий.
- Використати fetch для запиту до API.
*/

import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function loadTask() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        if (!signal.aborted) {
          setTask(data)
        }
      } catch (requestError) {
        if (!signal.aborted) {
          setError(requestError.message)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadTask()
    return () => controller.abort()
  }, [])

  return (
    <main className="container">
      <section className="task-panel" aria-labelledby="task-heading">
        <h1 id="task-heading">Завдання з API</h1>
        {loading && <p role="status">Завантаження…</p>}
        {error && <p role="alert">Не вдалося завантажити завдання. {error}</p>}
        {task && (
          <>
            <h2>{task.title}</h2>
            <dl>
              <dt>Номер завдання</dt>
              <dd>{task.id}</dd>
              <dt>Користувач</dt>
              <dd>№ {task.userId}</dd>
              <dt>Статус</dt>
              <dd>{task.completed ? 'Виконано' : 'Не виконано'}</dd>
            </dl>
          </>
        )}
      </section>
    </main>
  )
}

export default App
