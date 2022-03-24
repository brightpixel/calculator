import {render, screen, queryByAttribute, fireEvent} from "@testing-library/react";
import {Calculator} from "../components/Calculator";

const renderCalculator = () => {
    return render(<Calculator/>)
}

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

        expect(actual.textContent).toBe("3");
    });
})
