"use client";

import Link from "next/link";
import Logo from "./Logo"
import { Heart, ShoppingBagIcon } from "lucide-react";
import { usePathname } from "next/navigation";
// import { navigation } from "@/constants/data";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";

const Navbar = () => {
    const pathname = usePathname();
    const {data: session} = useSession()
    console.log(session)

    const navigation = [
        {_id: 910, title: "Home", href: "/"},
        {_id: 911, title: "Phones", href: "/phones"},
        {_id: 912, title: "Phone Cases", href: "/phonecases"},
        {_id: 913, title: "Watches", href: "/watches"},
        {_id: 914, title: "Accessories", href: "/accessories"}
    ];
  return (
    <div className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600">
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 xl:px-0">
            <Logo />

            <ul className="hidden md:flex items-center gap-5 text-sm uppercase font-semibold">
                {
                    navigation.map((item) => (
                        <Link href={item.href}>
                            <li className={`hover:text-black cursor-pointer duration-200 relative overflow-hidden group  ${item.href === pathname && "text-designColor"}`}>
                                {item?.title}
                                <span
                                    className={`absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ${
                                        item.href === pathname && "translate-x-0 bg-designColor"
                                    }`}
                                    />
                            </li>
                        </Link>
                    ))
                }
            </ul>

            <div className="flex items-center gap-x-5">
            <Link
                href={"/wishlist"}
                className="hover:text-black cursor-pointer duration-200 relative group"
                >
                <Heart className="w-7 h-7" />
                <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">
                    0
                </span>
            </Link>

            <Link
                href={"/cart"}
                className="hover:text-black cursor-pointer duration-200 relative group"
                >
                <ShoppingBagIcon className="w-7 h-7" />
                <span className="absolute top-0 -left-1 bg-zinc-800 text-zinc-200 w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-black font-semibold group-hover:text-white">
                0
                </span>
            </Link>

            {session ? (
                <Link
                href={"/profile"}
                className="hover:text-black cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
                >
                Profile
                <span className="absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
                </Link>
            ) : (
                <button
                className="hover:text-black cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
                onClick={() => signIn()}
                >
                Login
                <span className="absolute h-[1px] w-full bg-blue-700 left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
            )}
            </div>
        </div>
    </div>
  )
}

export default Navbar