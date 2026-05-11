"use client";

import React from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdwebClient";

const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
];

export default function ConnectButtonWrapper() {
    return <ConnectButton client={client} wallets={wallets} />;
}
