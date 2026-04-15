"use client";

import { useSwipeable } from "react-swipeable";
import Image from "next/image";

export default function CartItems({
    item,
    openId,
    setOpenId,
    increase,
    decrease,
    deleteItem,
}) {
    const handlers = useSwipeable({
        onSwipedLeft: () => setOpenId(item.id),
        onSwipedRight: () => setOpenId(null),
        delta: 40,
        trackTouch: true,
    });

    return (
        <div className="relative overflow-hidden mb-3 w-full">
            {/* DELETE */}
            <div className="absolute right-0.5 top-0.5 h-23 w-12 bg-danger flex items-center justify-center rounded-lg">
                <button onClick={() => deleteItem(item.id)}>
                    <Image src="/assets/icons/trash.svg" width={24} height={24} alt="Delete" />
                </button>
            </div>

            {/* ITEM */}
            <div
                {...handlers}
                className={`w-full sm:w-[335px] h-24 flex items-center bg-white border border-secondary rounded-lg py-2 px-3 gap-3 transition-transform duration-300
        ${openId === item.id ? "-translate-x-16" : "translate-x-0"}`}
                onClick={() => openId && setOpenId(null)}
            >
                <div className="w-[38%] sm:w-20">
                    <Image src={item.image} width={80} height={80} alt={item.name} className="w-20 h-20 item-clipPath object-cover" />
                </div>

                <div className="w-full sm:w-[216px] h-19 flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-heading leading-none font-dmSans">{item.name}</h3>

                    <div className="flex gap-1 flex-wrap">
                        {item.ingredients.map((ingredient, i) => (
                            <span key={i} className='bg-accent px-2 h-[15px] flex items-center justify-center rounded-full text-secondaryText text-[8px] font-light'>{ingredient}</span>
                        ))
                        }
                        {item.drink && <span className='bg-accent px-2 h-[15px] flex items-center justify-center rounded-full text-secondaryText text-[8px] font-light'>{item.drink}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary leading-none">
                            €{item.price}
                        </span>

                        {/* QTY BUTTON */}
                        <div className="flex items-center justify-center gap-2 bg-[#F6F6F6] rounded-full w-16 h-6">
                            <button
                                onClick={() => decrease(item.id)}
                                disabled={item.qty === 1}
                                className={`text-base font-bold text-minus ${item.qty === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                -
                            </button>

                            <span className="text-base font-semibold text-primary">
                                {item.qty}
                            </span>

                            <button
                                onClick={() => increase(item.id)}
                                className="text-base font-bold text-primary cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
