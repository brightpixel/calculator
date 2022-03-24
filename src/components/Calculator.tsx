import {useState} from "react";

export const Calculator = () => {
    const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    const operators = ["+", "-", "×", "÷"];
    const [memory, setMemory] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    const addToEquation = (sum:string) => {
        setValue(value.concat(sum));
    }

    const calculate = () => {
        const results = calculateEquation(value);
        setValue(results);
    };

    const calculateWithMemory = () =>{
        const results = calculateEquation(value + memory);
        setValue(results)
    }

    const calculateEquation = (equation: string) => {
        if (equation.length > 0) {
            const multiplyMatch = /×/g;
            const divideMatch = /÷/g;
            const divideByZeroMatch = /\/0/g;

            const result = equation.replace(multiplyMatch, "*").replace(divideMatch, "/");

            if (divideByZeroMatch.test(result))
                return "Error";

            return eval(result);
        }
    };

    const addToMemory = () =>{
        const candidate = parseFloat(value);

        if(!isNaN(candidate))
        {
            setMemory(memory + candidate);
        }

    }

    const clearMemory=()=> setMemory(0);
    const clearValue = () => setValue("");

    return <div className="calculator">
        <input id="calculation-display" type="text" className="calculator-display" disabled defaultValue={value}
               placeholder="0"/>
        <div className="keys">
            {operators.map((c) => (
                <button className="operator" key={c} onClick={() => addToEquation(c)}>
                    {c.toString()}
                </button>
            ))}
            {digits.map((digit, index) =>
                <button key={digit} onClick={() => addToEquation(digit.toString())}>
                    {digit}
                </button>
            )}
            <button onClick={() => addToEquation(".")}>.</button>
            <button className="memplus operator" onClick={addToMemory}>M+</button>
            <button className="memclear operator" onClick={calculateWithMemory}>MRC</button>
            <button className="equals operator" onClick={calculate}>=</button>
            <button className="clear" onClick={clearValue}>C</button>
        </div>
    </div>
};
