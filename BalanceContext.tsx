import { createContext, ReactNode, useContext, useState } from "react";

interface Balance {
    [key: string]: any;
    USDC: number;
    DAI: number;
    ETH: number;
    USDCETH: {
        USDC: number;
        ETH: number;
    };
    DAIUSDC: {
        DAI: number;
        USDC: number;
    };
}

interface Props {
    children: ReactNode;
}

const balanceContextDefaultValue: Balance = {
    USDC: 50000,
    DAI: 50000,
    ETH: 100,
    USDCETH: {
        USDC: 1300000,
        ETH: 1000,
    },
    DAIUSDC: {
        DAI: 100000,
        USDC: 100000,
    },
};

type balanceContextType = {
    balance: Balance;
    reBalance: (newBalance: Balance) => void;
};

const balanceContextDefaultValues: balanceContextType = {
    balance: balanceContextDefaultValue,
    reBalance: () => {},
};

const BalanceContext = createContext<balanceContextType>(
    balanceContextDefaultValues
);

export default function AuthProvider({ children }: Props): JSX.Element {
    const [balance, setBalance] = useState<Balance>(balanceContextDefaultValue);

    const reBalance = (newBalance: Balance) => {
        setBalance(newBalance);
    };

    const value = {
        balance,
        reBalance,
    };
    return (
        <BalanceContext.Provider value={value}>
            {children}
        </BalanceContext.Provider>
    );
}

export function useBalanceContext() {
    return useContext(BalanceContext);
}
