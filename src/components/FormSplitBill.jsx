//компонент ФормаВзаимоРасчетов

import { useState } from "react";

export default function FormSplitBill ({ friend, onChangeBalance })
{
  const [bill, setBill] = useState(0);
  const [yourExpenses, setYourExpenses] = useState(0);
  const [friendExpenses, setFriendExpenses] = useState(0);
  const [who, setWho] = useState('your');

  function handleOnSubmit (e)
  {
    e.preventDefault();
    let balance;

    if (who === 'your') balance = friend.balance + friendExpenses;
    else if (who === 'friend') balance = friend.balance - yourExpenses;
    else alert('что-то посчитали не так');

    const changeBalance = { ...friend, balance: balance };
    onChangeBalance(changeBalance);
    setBill(0);
    setYourExpenses(0);
    setFriendExpenses(0);
    setWho('your');
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

      <label htmlFor="your-expenses">👱Мои затраты</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="your-expenses"
        id="your-expenses"
        value={yourExpenses}
        onChange={(e) => setYourExpenses(Number(e.target.value))}
      />

      <label htmlFor="friend-expenses">🧑‍🤝‍🧑Затратил(а) {friend.name}</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="friend-expenses"
        id="friend-expenses"
        value={friendExpenses}
        onChange={(e) => setFriendExpenses(Number(e.target.value))}
      />

      <label htmlFor="who">❓Кто оплатил счет</label>
      <select
        name="who"
        id="who"
        value={who}
        onChange={(e) => setWho(e.target.value)}
      >
        <option value="your">Вы</option>
        <option value="friend">Друг</option>
      </select>

      <button className="button">
        Сделать взаиморасчет
      </button>
    </form>
  );
}