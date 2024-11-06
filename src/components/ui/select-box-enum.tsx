import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { ReviewStatusEnum } from "@/types/enum";


interface SelectBoxEnumProps {
    value: ReviewStatusEnum;
    options: { value: ReviewStatusEnum; label: string }[];
    onValueChange: (value: ReviewStatusEnum) => void;
}

const SelectBoxEnum: React.FC<SelectBoxEnumProps> = ({ value, options, onValueChange }) => {
    // Find the selected option by comparing numbers
    const selectedOption = options.find(option => option.value === value);

    // Use optional chaining to safely access the label
    const selectedLabel = selectedOption?.label ?? "Select an option";

    if (value === ReviewStatusEnum.APPROVED) {
        return (
            <div className="w-32 text-green-500">
                {selectedLabel}
            </div>
        );
    }

    if (value === ReviewStatusEnum.REJECT) {
        return (
            <div className="w-32 text-red-500">
                {selectedLabel}
            </div>
        );
    }

    return (
        <Select
            // Convert the numeric value to string for the Select component
            value={value.toString()}
            onValueChange={(val) => onValueChange(Number(val) as ReviewStatusEnum)}
        >
            <SelectTrigger className="w-32">
                {selectedLabel}
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectBoxEnum;