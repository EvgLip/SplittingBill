//компонент СписокДрузей
import Friend from "./Friend";



export default function FriendsList ({ friends, onSelectFriend })
{
  // const friends = initialFriends;

  return (
    <ul>
      {
        friends.map(friend =>
          <Friend
            key={friend.id}
            friend={friend}
            onSelectFriend={onSelectFriend}
          />)
      }
    </ul>
  );
}