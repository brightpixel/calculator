import {useState} from "react";

export const Calculator = () => {
    const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    const operators = ["+", "-", "×", "÷"];
    const [value, setValue] = useState("");

    const calculate = () => {
        const results = calculateExpression(value);
        setValue(results);
    };

    const calculateExpression = (expression: string) => {
        const multiplyMatch = /×/g;
        const divideMatch = /÷/g;
        const divideByZeroMatch = /\/0/g;

        const equation = expression.replace(multiplyMatch, "*").replace(divideMatch, "/");

        if (divideByZeroMatch.test(equation))
            throw new Error("Error. Can't divide by 0");

        return eval(equation);
    };

    const clearValue = () => setValue("");

    return <div className="calculator">
        <input id="calculation-display" type="text" className="calculator-display" disabled defaultValue={value} placeholder="0"/>
        <div className="keys">
            {operators.map((c) => (
                <button className="operator" key={c} onClick={() => setValue(value.concat(c))}>
                    {c.toString()}
                </button>
            ))}
            {digits.map((digit, index) =>
                <button key={digit} onClick={() => setValue(value.concat(digit.toString()))}>
                    {digit}
                </button>
            )}
            <button onClick={() => setValue(value.concat("."))}>.</button>
            <button className="equals operator" onClick={calculate}>=</button>
            <button className="clear" onClick={clearValue}>C</button>
        </div>
    </div>
};
