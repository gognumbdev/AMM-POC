import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useBalanceContext } from "../BalanceContext";
import { getImageSrc } from "../scripts/image";
import {
    getCalculationFromX,
    getCalculationFromY,
    getExchangeRate,
} from "../scripts/calculation";

interface SwapBoxProps {
    pool: string;
    assetA: string;
    assetB: string;
    setAssetA: (asset: string) => void;
    setAssetB: (asset: string) => void;
}

const SwapBox = ({
    pool,
    assetA,
    assetB,
    setAssetA,
    setAssetB,
}: SwapBoxProps): JSX.Element => {
    const { balance, reBalance } = useBalanceContext();
    // amount of A is deposits amount of asset A to liquidity pool
    // amount of B is swap amount of asset B from liquidity pool
    const [amountOfA, setAmountOfA] = useState(0);
    const [amountOfB, setAmountOfB] = useState(0);
    const [poolInBalance, setPoolInBalance] = useState(pool.replace("/", ""));

    useEffect(() => {
        setAmountOfA(0);
        setAmountOfB(0);
        setPoolInBalance(pool.replace("/", ""));
    }, [pool]);

    // useEffect(() => {

    // }, [balance])

    const handleSwap = () => {
        // 1 : new user asset A balance -> deposits to liquidity pool so subtract
        let newUserAssetA = balance[assetA] - amountOfA;
        // 2 : new user asset B balance -> swap from liquidity pool so add
        let newUserAssetB = balance[assetB] + amountOfB;
        // 3 : new liquidity pool asset A balance -> get from user so add
        let newLiquidityPoolAssetA = balance[poolInBalance][assetA] + amountOfA;
        // 4 : new liquidity pool asset B balance -> give to user so subtract
        let newLiquidityPoolAssetB = balance[poolInBalance][assetB] - amountOfB;

        // Rebalance user balance and liquidity pool balance on global state
        let newBalance = balance;
        newBalance[assetA] = newUserAssetA;
        newBalance[assetB] = newUserAssetB;
        newBalance[poolInBalance][assetA] = newLiquidityPoolAssetA;
        newBalance[poolInBalance][assetB] = newLiquidityPoolAssetB;
        // reBalance({
        //     ...balance,
        //     assetA: newUserAssetA,
        //     assetB: newUserAssetB,
        //     poolInBalance: {
        //         assetA: newLiquidityPoolAssetA,
        //         assetB: newLiquidityPoolAssetB,
        //     },
        // });
        reBalance(newBalance);
        setAmountOfA(0);
        setAmountOfB(0);
    };

    // AMM Constant Product Formula Calculation : xy = k where x is amount of asset A and y is amount of asset B
    const handleCalculation = (
        changingAsset: string,
        changingValue: string
    ) => {
        let x = balance[poolInBalance][assetA];
        let y = balance[poolInBalance][assetB];
        let k = x * y;
        if (changingAsset === assetA) {
            let depX = parseFloat(changingValue);
            setAmountOfA(depX);
            let newAmountOfB = getCalculationFromX(x, depX, y, k);
            setAmountOfB(newAmountOfB.swapY);
        } else {
            let swapY = parseFloat(changingValue);
            setAmountOfB(swapY);
            let newAmountOfA = getCalculationFromY(x, y, swapY, k);
            setAmountOfA(newAmountOfA.depX);
        }
    };

    const changeAsset = () => {
        setAssetA(assetB);
        setAssetB(assetA);
        setAmountOfA(amountOfB);
        setAmountOfB(amountOfA);
    };

    console.log(assetA, assetB, balance);

    return (
        <div className="flex flex-col p-8 w-10/12 sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-800 shadow-xl shadow-gray-700">
            {/* Box Header */}
            <div className="flex justify-between mb-4">
                <p className="flex flex-col text-base sm:text-lg md:text-xl lg:text-2xl">
                    <span>
                        Swap {assetA} to {assetB}
                    </span>
                    <span className="text-base">
                        {" "}
                        You can enter the amount you need on the asset channel
                    </span>
                </p>

                <button
                    className="border-2 rounded-md px-2  text-lg hover:bg-white hover:text-uniswap font-bold transition duration-150 transform ease-in-out "
                    onClick={changeAsset}
                >
                    Change base asset to {assetB}
                </button>
            </div>

            {/* Box Body : Swap between asset A and Asset B */}
            <div className="flex flex-col gap-4">
                {/* Asset A */}
                <div className="flex justify-between bg-gray-800 px-4 py-2 rounded-xl">
                    <input
                        type="number"
                        className="text-4xl bg-transparent outline-none"
                        value={amountOfA}
                        onChange={(event) =>
                            handleCalculation(assetA, event.target.value)
                        }
                    />
                    <div className="flex gap-1 items-center">
                        <Image
                            src={getImageSrc(assetA)}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                        <p className="font-bold text-xl">{assetA}</p>
                    </div>
                </div>

                {/* Asset B */}
                <div className="flex justify-between bg-gray-800 px-4 py-2 rounded-xl">
                    <input
                        type="number"
                        className="text-4xl bg-transparent outline-none"
                        value={amountOfB}
                        onChange={(event) =>
                            handleCalculation(assetB, event.target.value)
                        }
                    />
                    <div className="flex gap-1 items-center">
                        <Image
                            src={getImageSrc(assetB)}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                        <p className="font-bold text-xl">{assetB}</p>
                    </div>
                </div>
            </div>

            {/* Box footer : asset A after swap , asset B after swap ,cinstant k ,  price and swap button */}
            <div className="flex flex-col gap-10">
                {/* Info */}
                <div className="flex flex-col items-start justify-start gap-2 px-4 py-2 mt-4 w-full shadow-lg shadow-uniswap rounded-xl">
                    <p className="text-xl text-uniswap font-medium">
                        {pool} liquidity pool info
                    </p>
                    {/* Constant Product Formula Info : x,y,k */}
                    <div className="flex flex-col border-t-2 w-full py-2 border-gray-500">
                        {/* Before swap */}
                        <p className="text-lg text-uniswap font-medium">
                            Before Swap
                        </p>
                        {/* asset A amount : x */}
                        <p className="">
                            {assetA} amount ( x ) is{" "}
                            {balance[poolInBalance][assetA]} {assetA}
                        </p>
                        {/* asset B amount : y */}
                        <p className="">
                            {assetB} amount ( y ) is{" "}
                            {balance[poolInBalance][assetB]} {assetB}
                        </p>
                        {/* Constant Product : k */}
                        <p className="">
                            Constant Product ( xy=k ) is{" "}
                            {balance[poolInBalance][assetA] *
                                balance[poolInBalance][assetB]}{" "}
                            {assetA}
                            {assetB}
                        </p>
                        {/* After swap */}
                        <p className="text-lg text-uniswap font-medium">
                            After Swap
                        </p>
                        {/* asset A amount : x */}
                        <p className="">
                            {assetA} amount ( x ) is{" "}
                            {balance[poolInBalance][assetA] + amountOfA}{" "}
                            {assetA}
                        </p>
                        {/* asset B amount : y */}
                        <p className="">
                            {assetB} amount ( y ) is{" "}
                            {balance[poolInBalance][assetB] - amountOfB}{" "}
                            {assetB}
                        </p>
                        {/* Constant Product : k */}
                        <p className="">
                            Constant Product ( xy=k ) is{" "}
                            {balance[poolInBalance][assetA] *
                                balance[poolInBalance][assetB]}{" "}
                            {assetA}
                            {assetB}
                        </p>
                    </div>
                    {/* exchange rate */}
                    <div className="border-t-2 w-full py-2 border-gray-500">
                        <p>
                            You want to swap {amountOfA} {assetA} to {amountOfB}{" "}
                            {assetB}
                        </p>
                        <p>
                            Exchange rate :{" "}
                            {getExchangeRate(amountOfA, amountOfB)} {assetA} = 1{" "}
                            {assetB}
                        </p>
                    </div>
                    {/* User balance */}
                    <div className="pt-4 flex gap-10">
                        <p>User balance</p>
                        <p>USDC : {balance.USDC}</p>
                        <p>DAI : {balance.DAI}</p>
                        <p>ETH : {balance.ETH}</p>
                    </div>
                </div>

                {/* Swap Button */}
                <button
                    className="self-center px-4 py-2 w-fit  text-base sm:text-lg md:text-xl lg:text-2xl bg-blue-500 rounded-lg"
                    onClick={handleSwap}
                >
                    Swap
                </button>
            </div>
        </div>
    );
};

export default SwapBox;
