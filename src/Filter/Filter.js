import React, { useRef, useState } from 'react';
import styles from './Filter.module.css'

export function Filter({getPrice, filterProducts}) {
  const [minValue, setMinValue] = useState(getPrice(true))
  const [maxValue, setMaxValue] = useState(getPrice(false))
  const minRef = useRef()
  const maxRef = useRef()

  const handleChangeMinValue = () => {
    minRef.current.value < 0 ? setMinValue(0) : setMinValue(minRef.current.value)
  }

  const handleChangeMaxValue = () => {
    maxRef.current.value < 0 ? setMaxValue(0) : setMaxValue(maxRef.current.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    filterProducts(minValue, maxValue)
  }

  return (
    <div>
      <div className={styles.title}>Цена</div>
      <form className={styles.form}>
        <div className={styles.formWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="from" className={styles.label}>от</label>
            <input
              ref={minRef}
              type="number"
              id="from"
              className={styles.field}
              defaultValue={minValue}
              value={minValue}
              onChange={handleChangeMinValue}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="to" className={styles.label}>до</label>
            <input
              ref={maxRef}
              type="number"
              id="to"
              className={styles.field}
              defaultValue={maxValue}
              value={maxValue}
              onChange={handleChangeMaxValue}
            />
          </div>
        </div>
        <button className={styles.button} onClick={handleClick}>Применить</button>
      </form>
    </div>
  )
}
