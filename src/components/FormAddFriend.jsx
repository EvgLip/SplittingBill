//компонент ФормаДобовленияДруга
//к компоненту СписокДрузей

import { useState } from "react";

export default function FormAddFriend ({ onAddFriend })
{
  const [friendName, setFriendName] = useState('');
  const [imgURL, setImgURL] = useState('https://i.pravatar.cc/48?img=');

  function handleOnSubmit (e)
  {
    e.preventDefault();

    if (friendName && imgURL)
    {
      const friend =
      {
        id: crypto.randomUUID(),
        name: friendName,
        image: imgURL,
        balance: 0
      };
      onAddFriend(friend);
    }


    setFriendName('');
    setImgURL('https://i.pravatar.cc/48?img=');

    e.target.querySelector('#friend-name').focus();
  }

  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label htmlFor="friend-name">🧑‍🤝‍🧑Имя друга</label>
      <input
        type="text"
        placeholder="Укажите имя"
        name="friend-name"
        id="friend-name"
        value={friendName}
        onChange={e => setFriendName(e.target.value)}
      />
      <label htmlFor="url">🛣️Путь к аватарке</label>
      <input
        type="text"
        placeholder="Укажите URL к файлу аватарки"
        name="url"
        id="url"
        value={imgURL}
        onChange={e => setImgURL(e.target.value)}
      />
      {
        (friendName || imgURL) &&
        <button
          className="button"
          type="submit"
        >Добавить</button>
      }
    </form>
  );
}