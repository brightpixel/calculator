import {render, screen, queryByAttribute, fireEvent} from "@testing-library/react";
import {Calculator} from "../components/Calculator";

const renderCalculator = () => {
    return render(<Calculator/>)
}

const divide = "÷";
const multiply = "×"

describe("<Calculator /> ", () => {
    it("renders the calculator", () => {
        renderCalculator();
        expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    });

    it("has all the numbers", () => {
        renderCalculator();

        for (let i = 0; i < 10; i++) {
            expect(screen.getByRole("button", {name: i.toString()})).toBeInTheDocument();
        }
    });

    it("has all the operators", () => {
        renderCalculator();

        const operators = ["+", "-", "×", "÷"];

        operators.map(operator => expect(screen.getByRole("button", {name: operator.toString()})).toBeInTheDocument());
    });

    it("has an equals sign", () => {
        renderCalculator();

        expect(screen.getByText("=")).toBeInTheDocument();
    });

    it("can add two numbers together", async () => {
        renderCalculator();

        const one = screen.getByText("1");
        const plus = screen.getByText("+");
        const two = screen.getByText("2");
        const equals = screen.getByText("=");

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(two);
        fireEvent.click(equals);

        const actual = await screen.findByPlaceholderText("0");

        expect((actual as HTMLInputElement).value).toBe("3");
    });

    it("doesn't allow a divide by zero", async () => {
        renderCalculator();

        const one = screen.getByText("1");
        const plus = screen.getByText(divide);
        const two = screen.getByText("0");
        const equals = screen.getByText("=");

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(two);
        fireEvent.click(equals);

        const actual = await screen.findByPlaceholderText("0");

        expect((actual as HTMLInputElement).value).toBe("Error");
    });

    it("can add to memory and then return to calculation", async () => {
        renderCalculator();

        const one = screen.getByText("1");
        const zero = screen.getByText("0");
        const memplus = screen.getByText("M+");
        const memrec = screen.getByText("MRC");
        const clear = screen.getByText("C");
        const times = screen.getByText(multiply);

        fireEvent.click(one);
        fireEvent.click(zero);
        fireEvent.click(memplus);
        fireEvent.click(clear);

        fireEvent.click(one);
        fireEvent.click(zero);
        fireEvent.click(times);
        fireEvent.click(memrec);


        const actual = await screen.findByPlaceholderText("0");

        expect((actual as HTMLInputElement).value).toBe("100");
    });

    it("can clear the calculator", async () => {
        renderCalculator();

        const one = screen.getByText("1");
        const two = screen.getByText("2");
        const three = screen.getByText("3");
        const clear = screen.getByText("C");

        fireEvent.click(one);
        fireEvent.click(two);
        fireEvent.click(three);

        const actual = await screen.findByPlaceholderText("0");

        expect((actual as HTMLInputElement).value).toBe("123");

        fireEvent.click(clear);

        expect((actual as HTMLInputElement).value).toBe("");
    });
})
