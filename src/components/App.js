//файл приложения

import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FriendsList from "./FriendsList";
import FormSplitBill from "./FormSplitBill";

export default function App ()
{
  const [friends, setFriends] = useState([]);
  const [showAddFor, setShowAddFor] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});

  function onAddFriend (friend = {})
  {
    setFriends(f => [...f, friend]);
    setShowAddFor(true);
  }

  function onSelectFriend (friendId = null)
  {
    const [friend] = friends.filter((frnd) => frnd.id === friendId);
    setSelectedFriend((f) => friend);
  }

  function handleChangeBalance (newBalanceWithFriend)
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
        <FriendsList friends={friends} onSelectFriend={onSelectFriend} />
        {showAddFor && <FormAddFriend onAddFriend={onAddFriend} />}
        <button
          className="button"
          onClick={() => setShowAddFor((showAddFor) => !showAddFor)}
        >
          {showAddFor ? 'Закрыть' : 'Добавить друга'}
        </button>
      </article>

      {
        Object.keys(selectedFriend).length > 0 &&
        <FormSplitBill
          friend={selectedFriend}
          onChangeBalance={handleChangeBalance}
        />
      }
    </div>
  );
}
