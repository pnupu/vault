import Image from "next/image";
import { WalletButton } from "./wallet-button";

export function Header() {
  return (
    <div className="w-full fixed top-0 left-0 flex flex-row h-24">

      <h1 className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-4xl font-normal flex items-center">
        <Image src="/logo.png" alt="App Logo" width={40} height={40} className="mr-2" />
        Convexity
      </h1>

      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <WalletButton />
      </div>
    </div>
  );
}
