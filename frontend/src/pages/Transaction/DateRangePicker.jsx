import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateRangePicker(props) {
    const { startDate, endDate, selectedOption, setStartDate, setEndDate, setSelectedOption } = props;

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);

        const today = new Date();
        switch (e.target.value) {
            case 'thisMonth':
                setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
                setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
                break;
            case 'lastMonth':
                setStartDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
                setEndDate(new Date(today.getFullYear(), today.getMonth(), 0));
                break;
            case 'lastSixMonths':
                setStartDate(new Date(today.getFullYear(), today.getMonth() - 6, 1));
                setEndDate(new Date(today.getFullYear(), today.getMonth() - 5, 0));
                break;
            case 'custom':
                setStartDate(null);
                setEndDate(null);
                break;
            case 'none':
                setStartDate(null);
                setEndDate(null);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <select onChange={handleOptionChange} value={selectedOption}>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastSixMonths">Last 6 Months</option>
                <option value="custom">Custom</option>
                <option value="none">None</option>
            </select>
            {selectedOption === 'custom' ? (
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                    />
                </div>
            ) : null}
        </div>
    );
};
