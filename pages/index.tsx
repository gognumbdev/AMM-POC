import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useBalanceContext } from "../BalanceContext";
import Info from "../components/Info";
import SelectPool from "../components/SelectPool";
import SwapBox from "../components/SwapBox";

const Home: NextPage = () => {
    const [pool, setPool] = useState<string>("USDC/ETH");
    const [assetA, setAssetA] = useState(pool.split("/")[0]);
    const [assetB, setAssetB] = useState(pool.split("/")[1]);
    const { balance } = useBalanceContext();

    console.log(assetA, assetB);

    return (
        <div>
            <Head>
                <title>FinnX AMM</title>
                <meta name="FinnX AMM assignment" content="AMM MVP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main
                className="flex flex-col justify-center items-center gap-4 min-h-screen
             bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 text-white"
            >
                {/* Info */}
                {/* <Info
                    pool={pool}
                    setPool={setPool}
                    assetA={assetA}
                    assetB={assetB}
                /> */}
                {/* Select pool */}
                <SelectPool
                    setPool={setPool}
                    setAssetA={setAssetA}
                    setAssetB={setAssetB}
                />
                {/* SwapBox */}
                <SwapBox
                    assetA={assetA}
                    assetB={assetB}
                    pool={pool}
                    setAssetA={setAssetA}
                    setAssetB={setAssetB}
                />
            </main>
        </div>
    );
};

export default Home;
