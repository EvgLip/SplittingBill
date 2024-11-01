//компонент Друг

export default function Friend ({ friend, onSelectFriend })
{

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {/*ниже три варианта по состоянию поля balance*/}
      {
        friend.balance < 0 &&
        <p className="red">{`Вы должны ${Math.abs(friend.balance)}р`}</p>
      }
      {
        friend.balance > 0 &&
        <p className="green">{`${friend.name} должен(а) Вам ${friend.balance}р`}</p>
      }
      {
        friend.balance === 0 &&
        <p>{`Вы и ${friend.name} в рассчете`}</p>
      }
      <button
        className="button"
        onClick={() => onSelectFriend(friend.id)}
      >
        Выбрать
      </button>
    </li>
  );
}