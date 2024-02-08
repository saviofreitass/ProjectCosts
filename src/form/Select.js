import styles from "./Select.module.css"

function Select({name, text, options, handleOnChange, value}){

    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select required
            name={name} 
            id={name} 
            onChange={handleOnChange} 
            value={value || ''}>
                <option value="" disabled selected>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select