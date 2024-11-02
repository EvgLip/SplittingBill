//файл приложения

import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FriendsList from "./FriendsList";
import FormSplitBill from "./FormSplitBill";

export default function App ()
{
  const [friends, setFriends] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function hanldeOnAddFriend (friend)
  {
    if (!friend) return;

    setFriends(f => [...f, friend]);
    setShowAddForm(false);
  }

  function handleOnSelectFriend (friend)
  {
    setSelectedFriend(currenFriend => currenFriend?.id === friend.id ? null : friend);
    setShowAddForm(false);
  }

  function handleOnChangeBalance (transferAmount)
  {
    if (transferAmount) 
    {
      setFriends(friends =>
        friends.map((friend) =>
          friend.id === selectedFriend.id
            ? { ...friend, balance: friend.balance + transferAmount }
            : friend
        )
      );
    }

    setSelectedFriend(null);
  }

  return (
    <div className="app">

      <article className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleOnSelectFriend}
        />
        {showAddForm && <FormAddFriend onAddFriend={hanldeOnAddFriend} />}
        <button
          className="button"
          onClick={() => setShowAddForm((show) => !show)}
        >
          {showAddForm ? 'Закрыть' : 'Добавить друга'}
        </button>
      </article>

      {
        selectedFriend &&
        <FormSplitBill
          friend={selectedFriend}
          onSplitBill={handleOnChangeBalance}
        />
      }
    </div>
  );
}
