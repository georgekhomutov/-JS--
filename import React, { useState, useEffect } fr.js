import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://api.test.cyberia.studio/api/v1/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data.items);
      })
      .catch(error => console.error('Ошибка при получении данных о проектах:', error));
  }, []);

  return (
    <div>
      <h2>Список проектов компании</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} />
            <p>{project.description}</p>
            <p>Категория: {project.categories[0].name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('https://api.test.cyberia.studio/api/v1/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при отправке данных');
        }
        console.log('Данные успешно отправлены');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agree: false,
        });
      })
      .catch(error => console.error('Ошибка при отправке данных:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Имя:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Телефон:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Сообщение:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required />
          Согласен с обработкой персональных данных
        </label>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default function App() {
  return (
    <div>
      <ProjectsList />
      <FeedbackForm />
    </div>
  );
}