import { createContext, useContext, useState, ReactNode } from "react";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";

interface BeneficiaryContextType {
    beneficiary: BeneficiaryType | null;
    setBeneficiary: (beneficiary: BeneficiaryType | null) => void;
}

const BeneficiaryContext = createContext<BeneficiaryContextType | undefined>(undefined);

export const BeneficiaryProvider = ({ children }: { children: ReactNode }) => {
    const [beneficiary, setBeneficiary] = useState<BeneficiaryType | null>(null);

    return (
        <BeneficiaryContext.Provider value={{ beneficiary, setBeneficiary }}>
            {children}
        </BeneficiaryContext.Provider>
    );
};

export const useBeneficiary = () => {
    const context = useContext(BeneficiaryContext);
    if (!context) {
        throw new Error("useBeneficiary must be used within a BeneficiaryProvider");
    }
    return context;
};