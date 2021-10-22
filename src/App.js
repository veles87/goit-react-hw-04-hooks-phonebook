import React, { useState, useEffect } from "react";
import Container from "./components/Container";
import ContactForm from "./components/FormContacts";
import ContactList from "./components/ListContacts";
import Filter from "./components/Filter";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find((contact) => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (!name.trim() || !number.trim()) {
      alert("Enter the contact's name and number phone!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert("Enter the correct number phone!");
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDelete={handleDeleteContact}
        />
      ) : (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
    </Container>
  );
}

export default App;
