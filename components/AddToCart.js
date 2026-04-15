import Image from 'next/image';
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useBottomSheetSwipe } from '../hooks/useBottomSheetSwipe';

export default function AddToCart({ onClose, item }) {

    const [qty, setQty] = useState(1);
    const [info, setInfo] = useState(false);

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState("");

    const ingredientsList = ["Cheese", "Tomato", "Ketchup", "Chicken"];
    const drinksList = ["Coca Cola", "Pepsi", "Sprite", "Fanta", "Zup"];

    // Quantity logic
    const increase = () => setQty(qty + 1);
    const decrease = () => qty > 1 && setQty(qty - 1);

    // Ingredient toggle
    const toggleIngredient = (name) => {
        setSelectedIngredients((prev) =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    };

    // ADD TO CART FUNCTION
    const handleAddToCart = () => {
        const cartItem = {
            id: item?.id ?? Date.now(),
            name: item?.name,
            price: item?.price,
            qty,
            ingredients: selectedIngredients,
            drink: selectedDrink,
            image: item?.image,
        };

        // Save to localStorage
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!Array.isArray(cart)) {
            cart = []; // reset corrupted data
        }
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        onClose(); // Close modal after adding  
    };

    const infoSwipeHandlers = useBottomSheetSwipe(() => setInfo(false));

    return (
        <>
            {/* MAIN MODAL */}
            <div className={`fixed inset-0 z-[100000] flex items-center justify-center bg-[#00000080] backdrop-blur-xl  ${info ? "overflow-hidden" : "overflow-auto"}`}>
                <div className="bg-background rounded-xl w-full md:w-[350px] h-full flex flex-col items-center mt-4 overflow-auto pb-20 no-scrollbar">
                    <div className="w-full flex items-center justify-between relative">
                        <Image
                            src={item.image}
                            priority
                            width={375}
                            height={220}
                            alt="Item Banner"
                            className="w-full h-[220px] rounded-tl-xl rounded-tr-xl object-cover"
                        />
                        <RxCross2
                            className="text-[20.22px] text-heading cursor-pointer absolute top-3 right-3"
                            onClick={onClose}
                        />
                    </div>

                    <div className="bg-background w-full -mt-5 p-4 rounded-t-lg z-[10]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                                <h3 className="text-sm font-semibold text-heading font-dmSans">{item.name}</h3>
                                <Image
                                    src="/assets/icons/info.svg"
                                    width={16}
                                    height={16}
                                    alt="info"
                                    className="cursor-pointer"
                                    onClick={() => setInfo(true)}
                                />
                            </div>
                            <span className="text-base font-semibold text-primary">
                                €{item.price}
                            </span>
                        </div>

                        <p className="text-xs text-primaryText py-4">
                            {item.description}
                        </p>

                        {/* INGREDIENTS */}
                        <h3 className="text-base font-semibold text-heading font-dmSans">Ingredients</h3>
                        <div className="flex flex-col gap-4 pt-2">
                            {ingredientsList.map((ing) => (
                                <div key={ing} className="flex items-center justify-between">
                                    <span className="text-xs text-primaryText cursor-pointer"
                                        onClick={() => toggleIngredient(ing)}>{ing}</span>
                                    {/* <input
                                        type="checkbox"
                                        className="rounded-[3px] w-[14px] h-[14px] border border-borderColor accent-primary cursor-pointer"
                                        checked={selectedIngredients.includes(ing)}
                                        onChange={() => toggleIngredient(ing)}
                                    /> */}
                                    {selectedIngredients.includes(ing) ?
                                        <Image
                                            src="/assets/icons/checkedbox.svg"
                                            width={16}
                                            height={16}
                                            alt="checkbox"
                                            className="cursor-pointer"
                                            onClick={() => toggleIngredient(ing)}
                                        />
                                        :
                                        <Image
                                            src="/assets/icons/checkbox.svg"
                                            width={16}
                                            height={16}
                                            alt="checkbox"
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => toggleIngredient(ing)}
                                        />
                                    }
                                </div>
                            ))}
                        </div>

                        {/* DRINKS */}
                        <h3 className="text-base font-semibold text-heading pt-4 font-dmSans">Choose Drink</h3>
                        <div className="flex flex-col gap-4 pt-2">
                            {drinksList.map((drink) => (
                                <div key={drink} className="flex items-center justify-between">
                                    <span className="text-xs text-primaryText cursor-pointer"
                                        onClick={() => setSelectedDrink(drink)}>{drink}</span>
                                    {/* <input
                                        type="radio"
                                        name="drink"
                                        checked={selectedDrink === drink}
                                        onChange={() => setSelectedDrink(drink)}
                                        className='cursor-pointer'
                                    /> */}
                                    <div className={`w-4 h-4 border ${selectedDrink === drink ? "border-primary" : "border-borderColor"} rounded-full flex items-center justify-center cursor-pointer`}
                                        onClick={() => setSelectedDrink(drink)}
                                    >
                                        <div className={`w-3 h-3 border border-white rounded-full ${selectedDrink === drink ? "bg-primary" : "bg-white"}`}>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* BOTTOM FIXED ADD TO CART */}
                <div className="w-full md:w-[350px] h-20 flex shadow-[0_-4px_24px_0px_#0000000A] p-4 bg-white rounded-tr-lg rounded-tl-lg -mt- z-[100] absolute -bottom-2 left-0">
                    <div className="flex items-center justify-between gap-2 w-full">
                        {/* QTY BUTTON */}
                        <div className="flex items-center justify-center gap-2 bg-secondaryBackground rounded-full w-20 shrink-0 h-12">
                            <button
                                onClick={decrease}
                                disabled={qty === 1}
                                className={`text-base font-bold ${qty === 1 ? "text-primaryText cursor-not-allowed" : "text-primaryText cursor-pointer"}`}
                            >
                                -
                            </button>

                            <span className="text-base font-semibold text-primary">{qty}</span>

                            <button onClick={increase} className="text-base font-bold text-primary cursor-pointer">
                                +
                            </button>
                        </div>

                        {/* ADD TO CART BUTTON */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary rounded-full w-full sm:w-64 h-12 font-medium flex items-center justify-between gap-2 px-4 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Image
                                    src="/assets/icons/cart.svg"
                                    width={20}
                                    height={20}
                                    alt="cart"
                                />
                                <span className="text-[#F5F9FE] text-sm">Add To Cart</span>
                            </span>

                            <span className="text-[#F5F9FE] text-sm">€{(item.price * qty).toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* INFO MODAL */}
            {info && (
                <div className="fixed top-0 left-0 z-[10000000] flex items-end justify-center bg-[#00000080] backdrop-blur-[4px] w-full h-full"
                    {...infoSwipeHandlers}>
                    <div className="bg-background rounded-tl-lg rounded-tr-lg w-full md:w-[350px] h-[248px] px-4 pt-3 relative">
                        <div className="relative w-full gap-1 py-3 border-b border-borderColor">
                            <h3 className="text-sm font-semibold text-heading text-center font-dmSans">
                                Product Info
                            </h3>
                            <RxCross2
                                className="text-[16.86px] font-semibold rounded-lg text-heading cursor-pointer absolute top-1/2 -right-1 transform -translate-x-1/2 -translate-y-1/2"
                                onClick={() => setInfo(false)}
                            />
                            <div className="w-14 h-[3px] bg-secondary rounded-lg absolute -top-0.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="py-4 flex flex-col gap-1">
                            <h3 className="text-sm font-semibold text-heading font-dmSans">{item.name}</h3>
                            <p className="text-xs text-primaryText">{item.description}</p>

                            <h3 className="text-xs font-semibold text-heading pt-2 font-dmSans">Ingredients</h3>
                            <p className="text-xs text-primaryText">Cheese, Ketchup, Fries, Salad, Onion, Chicken, Hotdog, Garlic</p>

                            <h3 className="text-xs font-semibold text-heading pt-2 font-dmSans">Allergens</h3>
                            <p className="text-xs text-primaryText">soy, peanuts, egg, lactose, gluten, sesame, mustard, sulfites, lupin, fish, mollusks</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
