// import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import ContactsForm from 'modules/PhoneBook/ContactsForm/ContactsForm';
import ContactsList from 'modules/PhoneBook/ContactList/ContactList';
import Filter from 'modules/PhoneBook/Filter/Filter';
import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../redux/contacts/contacts-operations';

import { setFilter } from 'redux/filter/filter-slice';
import { getFiltredContacts } from 'redux/contacts/contacts-selector';
import { getFilter } from 'redux/filter/filter-selector';

const App = () => {
  const filtredContacts = useSelector(getFiltredContacts);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filtredContacts.length);

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleFilter} />
      {isContacts && (
        <ContactsList
          items={filtredContacts}
          removeContact={handleDeleteContact}
        />
      )}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};

export default App;
