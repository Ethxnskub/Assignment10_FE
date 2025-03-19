'use client'
import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function BookingList(){
    const venueItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    
    return (
        <>
        {
            venueItems.length === 0 ? (
                <div className="text-center text-gray-500 text-xl py-5">
                    No Venue Booking
                </div>
            ) 
            :(venueItems.map((BookingItem) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={BookingItem.venue}>
                   <div className="text-xl text-black">{BookingItem.venue}</div>
                    <div className="text-l text-black">{BookingItem.nameLastname}</div>
                    <div className="text-sm text-black">{BookingItem.tel}</div>
                    <div className="text-sm text-black">{BookingItem.bookDate}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm" onClick={()=>dispatch(removeBooking(BookingItem))}>Remove from List</button>
                </div>
            ))
            )
        }
        </>
    )
}