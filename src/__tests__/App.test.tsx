import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';


const renderPage = () =>{
    return render(<App />);
}

describe("<App /> page ", () => {
    it('renders the Equal Experts logo', () => {
        renderPage();
        expect(screen.getByRole("img", {
            name: "Equal Experts"
        })).toBeInTheDocument();
    });
});
