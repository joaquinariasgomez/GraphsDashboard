import React, {useState, ChangeEvent } from 'react';

// interface CreateGraphStep1Props {
//     onNext: () => void,     // Function to move to the next step
//     onChange: (data: { [key: string]: string }) => void;    // Function to handle form data changes
// }

export default function CreateGraphStep1({ onNext, onChange }) {

    // State to manage form data
    const [formData, setFormData] = useState({
        graphType: 0,
        password: ''
    });

    //Function to handle input changes
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     // Update the form data state
    //     setFormData({ ...formData, [name]: value });
    //     // Invoke the onChange function with updated form data
    //     onChange({ [name]: value });
    // }

    const handleSelectedType = (typeIdx) => {
        setFormData({ ...formData, graphType: typeIdx});
    }

    return (
        <div>
            <div className='creategraphstep1__container'>
            {/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /> */}
                <div className='creategraphsstep1__type'>
                    <button
                        className={formData.graphType === 0 ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType(0)}
                    >
                        Button 1: Expenses
                    </button>
                    <button
                        className={formData.graphType === 1 ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType(1)}
                    >
                        Button 2: Incomes
                    </button>
                    <button
                        className={formData.graphType === 2 ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType(2)}
                    >
                        Button 3: Savings
                    </button>
                </div>
                <div>
                    
                </div>
            </div>
            <div className="creategraphbox__nextbackrow">
                <button className="creategraphbox__backbutton">
                    Back
                </button>
                <button className="creategraphbox__nextbutton" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>  
    );
}