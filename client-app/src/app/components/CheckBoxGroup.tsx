import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    onChange: (items: string[]) => void;
    checkedValues?: string[];
}

export default function CheckBoxGroup({items, onChange, checkedValues}: Props){
    const [checkedItems, setCheckedItems] = useState(checkedValues || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if(currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
        {items.map((item) => (
            <FormControlLabel 
                control={
                <Checkbox checked={ 
                    checkedItems.indexOf(item) !== -1 } 
                    onClick={() => handleChecked(item)} 
                />} 
                label={item}
                key={item} />
        ))}
        </FormGroup>
    );
}