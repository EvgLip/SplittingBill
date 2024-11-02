//компонент ФормаВзаимоРасчетов

import { useState } from "react";

export default function FormSplitBill ({ friend, onSplitBill })
{
  const [bill, setBill] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const friendExpenses = bill ? bill - userExpenses : 0;
  const [whoIsPaying, setPaidByWho] = useState('select');

  function handleOnSubmit (e)
  {
    e.preventDefault();

    if (whoIsPaying === 'select')
    {
      const select = e.target.querySelector('#who-is-paying');
      select.style.backgroundColor = '#ffdbd3';
      select.focus();
      return;
    }

    if (bill === 0) 
    {
      const select = e.target.querySelector('#bill');
      select.style.backgroundColor = '#ffdbd3';
      select.focus();
      return;
    }

    const transferAmount = (whoIsPaying === 'user' ? friendExpenses : -userExpenses);

    // const changeBalance = { ...friend, balance: friend.balance + transferAmount };
    onSplitBill(transferAmount);
  }

  return (
    <form className="form-split-bill" onSubmit={handleOnSubmit}>
      {/* <h2>{`Для взаиморасчетов выбран(а) ${friend.name}`}</h2> */}
      <h2>Для взаиморасчетов выбран(а) <span>{friend.name}</span></h2>

      <label htmlFor="bill">👛Общий счет</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="bill"
        id="bill"
        value={bill}
        onChange={(e) => 
        {
          e.target.style.backgroundColor = "#fff";
          setBill(Number(e.target.value));
        }
        }
      />

      <label htmlFor="user-expenses">👱Ваши расходы</label>
      <input
        type="number"
        placeholder="Укажите сумму"
        name="user-expenses"
        id="user-expenses"
        value={userExpenses}
        onChange={(e) =>
          setUserExpenses(Number(e.target.value) <= bill
            ? Number(e.target.value)
            : userExpenses
          )
        }
      />

      <label htmlFor="friend-expenses">🧑‍🤝‍🧑Расходы {friend.name}</label>
      <input
        type="number"
        name="friend-expenses"
        id="friend-expenses"
        value={friendExpenses}
        disabled
      />

      <label htmlFor="who-is-paying">❓Кто оплатил счет</label>
      <select
        name="who-is-paying"
        id="who-is-paying"
        value={whoIsPaying}
        onChange={(e) =>
        {
          e.target.style.backgroundColor = "#fff";
          setPaidByWho(e.target.value);
        }
        }
      >
        <option value="select" disabled>Выбери кто платил</option>
        <option value="user">Вы</option>
        <option value="friend">{friend.name}</option>
      </select>

      <button type="submit" className="button">
        Сделать взаиморасчет
      </button>
    </form>
  );
}