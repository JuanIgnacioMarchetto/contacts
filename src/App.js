import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);

  const handleAddContact = () => {
    if (!name || !email || !phone) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newContact = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      phone: phone
    };
    setContacts([...contacts, newContact]);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleEditContact = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    setName(contactToEdit.name);
    setEmail(contactToEdit.email);
    setPhone(contactToEdit.phone);
    setEditingContactId(id);
  };

  const handleUpdateContact = () => {
    const updatedContacts = contacts.map(contact =>
      contact.id === editingContactId ? { ...contact, name, email, phone } : contact
    );
    setContacts(updatedContacts);
    setName('');
    setEmail('');
    setPhone('');
    setEditingContactId(null);
  };

  const handleDeleteContact = (id) => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContacts);
  };

  const handleCancelEdit = () => {
    setName('');
    setEmail('');
    setPhone('');
    setEditingContactId(null);
  };

  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="App">
      <div className="App-header" >
        
      <h1>Generador de Tarjetas de Contacto</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Número de Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {editingContactId ? (
          <>
            <button onClick={handleUpdateContact}>Actualizar Contacto</button>
            <button onClick={handleCancelEdit}>Cancelar Edición</button>
          </>
        ) : (
          <button onClick={handleAddContact}>Agregar Contacto</button>
        )}
      </div>
      <div className="contacts">
        <h2>Contactos</h2>
        <ul>
          {sortedContacts.map(contact => (
            <li key={contact.id}>
              <p>Nombre: {contact.name}</p>
              <p>Correo Electrónico: {contact.email}</p>
              <p>Número de Teléfono: {contact.phone}</p>
              <button onClick={() => handleEditContact(contact.id)}>Editar</button>
              <button onClick={() => handleDeleteContact(contact.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default App;
