import styles from './app.module.css'
import './index.css'
import { useState } from 'react';

function App() {

  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [list, setList] = useState([])

  const onInputButtonClick = () => {
    const promptValue = prompt()

    if(promptValue.length < 3){
      setError("Введенное значение должно содержать минимум 3 символа")
    }else {
      setValue(promptValue)
      setError("")
    }
  }

  const isValueVaild = value.length >= 3

  const onAddButtonClick = () => {
    if(value.length >= 3){
      const updatedList = [...list, {id: Date.now(), value: value}]
      setList(updatedList)
      setError("")
      setValue("")
    }
  }



  return (
    <div className={styles.app}>
      <h1 className={styles['page-heading']}>Ввод значения</h1>

      <p className={styles['no-margin-text']}>
        Текущее значение <code>value</code>: "
        <output className={styles['current-value']}>{value}</output>"
      </p>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles['buttons-container']}>
        <button className={styles.button} onClick={() => onInputButtonClick()}>Ввести новое</button>
        <button className={styles.button} disabled = {!isValueVaild} onClick={() => onAddButtonClick()}>
          Добавить в список
        </button>
      </div>

      <div className={styles['list-container']}>
        <h2 className={styles['list-heading']}>Список:</h2>
        <p className={styles['no-margin-text']}>Нет добавленных элементов</p>

        <ul className={styles.list}>
          {list.map(({ id, value }) => <li className={styles['list-item']} key = {id}>{value}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
