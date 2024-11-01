//файл приложения

import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FriendsList from "./FriendsList";
import FormSplitBill from "./FormSplitBill";

//тестовые данные
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App ()
{
  const [friends, setFriends] = useState([]);
  const [add, setAdd] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});

  function onAddFriend (friend = {})
  {
    setFriends(f => [...f, friend]);
    setAdd(true);
  }

  function onSelectFriend (friendId = null)
  {
    const [friend] = friends.filter((frnd) => frnd.id === friendId);
    setSelectedFriend((f) => friend);
  }

  function handleChangeBalance (newBalanceWithFriend)
  {
    if (!newBalanceWithFriend) return;

    setFriends(
      friends.map((friend) =>
        friend.id === newBalanceWithFriend.id
          ? newBalanceWithFriend
          : friend
      )
    );

    setSelectedFriend({});

  }

  return (
    <div className="app">

      <article className="sidebar">
        <FriendsList friends={friends} onSelectFriend={onSelectFriend} />
        {
          add &&
          <FormAddFriend onAddFriend={onAddFriend} />
        }
        <button className="button" onClick={() => setAdd((add) => !add)} >
          {add ? 'Закрыть' : 'Добавить друга'}
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
