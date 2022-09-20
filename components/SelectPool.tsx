import Image from "next/image";
import React from "react";
import USDC from "../public/image/USDC.png";
import ETH from "../public/image/ETH.png";
import DAI from "../public/image/DAI.png";

interface SelectPoolProps {
    setPool: (value: string) => void;
    setAssetA: (value: string) => void;
    setAssetB: (value: string) => void;
}

const SelectPool = ({ setPool, setAssetA, setAssetB }: SelectPoolProps) => {
    const handleSelectPool = (pool: string) => {
        let assets: string[] = pool.split("/");
        setPool(pool);
        setAssetA(assets[0]);
        setAssetB(assets[1]);
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="text-xl font-medium">Select Liquidity Pool</p>
            <div className="flex flex-col md:flex-row gap-x-10">
                <div
                    className="flex flex-row items-center p-4 gap-x-4 border-2 border-white rounded-md cursor-pointer
             hover:bg-white hover:text-black hover:border-black active:scale-90 transition duration-300 transform ease-in-out"
                    onClick={() => handleSelectPool("USDC/ETH")}
                >
                    <div className="flex gap-x-2">
                        <Image
                            src={USDC}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                        <Image
                            src={ETH}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                    </div>
                    <p className="font-bold text-xl">USDC/ETH</p>
                </div>
                <div
                    className="flex flex-row items-center p-4 gap-x-4 border-2 border-white rounded-md cursor-pointer
             hover:bg-white hover:text-black hover:border-black active:scale-90 transition duration-300 transform ease-in-out"
                    onClick={() => handleSelectPool("DAI/USDC")}
                >
                    <div className="flex gap-x-2">
                        <Image
                            src={DAI}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                        <Image
                            src={USDC}
                            width={30}
                            height={30}
                            objectFit="contain"
                        />
                    </div>
                    <p className="font-bold text-xl">DAI/USDC</p>
                </div>
            </div>
        </div>
    );
};

export default SelectPool;
