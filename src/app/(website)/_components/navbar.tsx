import { MenuIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {}

const LandingPageNavbar = (props: Props) => {
    return <div className="flex w-full justify-between items-center">
        <div className="text-3xl font-semibold flex-centre gap-x-3">
            <MenuIcon className="w-6 h-6" />
            <Image src="/eloom.svg" alt="Eloom" width={40} height={40} />
            Eloom
        </div>
        <div className="hidden gap-x-10 items-center lg:flex">
            <Link className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80" href="/">Home</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
        </div>
        <Link href="/auth/sign-in">
            <Button className="text-base flex gap-x-2">
                Login
            </Button>
        </Link>
    </div>
}

export default LandingPageNavbar;
