import React from "react"




export default function GetData() {

    const [allCurrencies, setAllCurrencies] = React.useState([])
    const [selected, setSelected] = React.useState()
    const [selectedTo, setSelectedTo] = React.useState()
    const [inputFrom, setInputFrom] = React.useState(0)
    const [inputTo, setInputTo] = React.useState(0)

    React.useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f91cf356f7mshd24af2e84b8f7bdp185d4ejsn4695e0349b92',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };
    
    fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
        .then(response => response.json())
        .then(data => setAllCurrencies(data))
        .catch(err => console.error(err));
    }, []);


    function handleChange(event){
        if(event.target.id === "from"){
            setSelected(event.target.value)
        }else{
            setSelectedTo(event.target.value)
        }    
     }

     function handleClick(event){
        event.preventDefault()
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '286d029352msha66a49f5f93f5c8p1085d6jsn93eca92c88d7',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        };
        
        fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${selected}&to=${selectedTo}&q=1.0`, options)
            .then(response => response.json())
            .then(response => setInputTo((response * parseFloat(inputFrom)).toFixed(3)))
            .catch(err => console.error(err));

    }

     function handleChangeToo(event){
        const {name, value} = event.target
        name === "inputFrom" ? setInputFrom(value) : setInputTo(value)
     }


return(
    <div className = "allCurrencies">
        <h1>Currency Exchange </h1>
        <div className="selectBaseCurrs">
            <label>From:</label>
            <select value = {selected} className ="selectCurrency" onChange = {(event) => handleChange(event)} id ="from">
                { allCurrencies.map(curr => (<option key = {curr} value = {curr}> {curr} </option> ))}
            </select>
            <label>To:</label>
            <select value = {selectedTo} className = "selectCurrency" onChange = {(event) => handleChange(event)} id ="to">
                { allCurrencies.map(curr => (<option key = {curr} value = {curr}> {curr} </option> ))}
            </select>
        </div>
        <div className ="inputAmount">
            <form>
                <input className= "inputNumber" type ="text" placeholder={selected} name ="inputFrom" onChange = {handleChangeToo} value ={inputFrom} /> <label className ="labelCur">{selected}</label>
                <input className= "inputNumber" type ="text" placeholder={selectedTo} name="inputTo" onChange = {handleChangeToo} value={inputTo} disabled/> <label className ="labelCur">{selectedTo}</label>
                <button className= "inputButton" type= "submit" onClick ={handleClick}>GO!</button>
            </form>
        </div>
    </div>
)}