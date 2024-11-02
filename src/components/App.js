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

  function handleOnSelectFriend (friend = null)
  {
    setSelectedFriend(friend);
    //if (!currentFriend)
    // {
    //   setSelectedFriend
    // }
    //   const [foundFriend] = friends.filter((friend) => frnd.id === currentFriend.id);
    // setSelectedFriend((f) => foundFriend);
  }

  function handleOnChangeBalance (newBalanceWithFriend)
  {
    if (newBalanceWithFriend) 
    {
      setFriends(
        friends.map((friend) =>
          friend.id === newBalanceWithFriend.id
            ? newBalanceWithFriend
            : friend
        )
      );
    }

    setSelectedFriend({});
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
          onChangeBalance={handleOnChangeBalance}
        />
      }
    </div>
  );
}
