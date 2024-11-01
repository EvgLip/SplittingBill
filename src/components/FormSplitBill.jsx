//компонент ФормаВзаимоРасчетов

import { useState } from "react";

export default function FormSplitBill ({ friend, onChangeBalance })
{
  const [bill, setBill] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  // const [friendExpenses, setFriendExpenses] = useState(0);
  const [who, setWho] = useState('select');

  function handleOnSubmit (e)
  {
    e.preventDefault();
    let balance;
    const friendExpenses = bill - userExpenses;

    if (who === 'select') return;

    if (who === 'user') balance = friend.balance + friendExpenses;
    else if (who === 'friend') balance = friend.balance - userExpenses;
    else alert('что-то посчитали не так');

    const changeBalance = { ...friend, balance: balance };
    onChangeBalance(changeBalance);
    clearForm();
  }

  function handleOnCancel ()
  {
    onChangeBalance(undefined);
    clearForm();
  }

  function clearForm ()
  {
    setBill(0);
    setUserExpenses(0);
    setWho('user');
  }

  return (
    <form className="form-split-bill" onSubmit={handleOnSubmit}>
      <h2>{`Для взаиморасчетов выбран(а) ${friend.name}`}</h2>

      <label htmlFor="bill">👛Общий счет</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="bill"
        id="bill"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="user-expenses">👱Мои затраты</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="user-expenses"
        id="user-expenses"
        value={userExpenses}
        onChange={(e) => setUserExpenses(Number(e.target.value))}
      />

      <label htmlFor="friend-expenses">🧑‍🤝‍🧑Затратил(а) {friend.name}</label>
      <input
        type="number"
        name="friend-expenses"
        id="friend-expenses"
        value={bill - userExpenses}
        disabled
      />

      <label htmlFor="who">❓Кто оплатил счет</label>
      <select
        name="who"
        id="who"
        value={who}
        onChange={(e) => setWho(e.target.value)}
      >
        <option value="select" disabled>Выбери кто платил</option>
        <option value="user">Вы</option>
        <option value="friend">{friend.name}</option>
      </select>

      <button type="button" className="button btn-cancel" onClick={handleOnCancel}>
        Отменить
      </button>

      <button type="submit" className="button">
        Сделать взаиморасчет
      </button>
    </form>
  );
}