import axios from 'axios';

const contactsInstatnce = axios.create({
  baseURL: 'https://6400720829deaba5cb37aace.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstatnce.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactsInstatnce.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await contactsInstatnce.delete(`/${id}`);
  return data;
};
