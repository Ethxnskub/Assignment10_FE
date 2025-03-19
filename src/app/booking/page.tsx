'use client'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"

// export default async function DashboardPage(){
//     const session = await getServerSession(authOptions)
//     if(!session || !session.user.token) return null

//     const profile = await getUserProfile(session.user.token)
//     var createdAt = new Date(profile.data.createdAt);
    
//     return(
//         <main className="bg-slate-100 m-5 p-5">
//             <div className="text-2xl text-black">{profile.data.name}</div>
//             <table className="table-auto border-separate border-spacing-2 text-black"><tbody>
//                 <tr><td>Email</td><td> : {profile.data.email}</td></tr>
//                 <tr><td>Tel.</td><td> : {profile.data.tel}</td></tr>
//                 <tr><td>Member Since</td><td> : {createdAt.toString()}</td></tr>
//                 </tbody></table>
//         </main>
//     )
// }

import styles from './page.module.css'
import LocationDateBooking from '@/components/DateReserve';
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"

export default function Booking(){
    const urlParams = useSearchParams()
    const vid = urlParams.get('id')
    const name = urlParams.get('name')

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if(vid && name && bookingDate && bookingName && bookingTel){
            const item:BookingItem = {
                nameLastname: bookingName,
                tel: bookingTel,
                venue: name,
                bookDate: dayjs(bookingDate).format("DD/MM/YYYY")
            }
            dispatch(addBooking(item))
        }
    }

    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [venueLocation, setVenueLocation] = useState<string>("Bloom")
    const [bookingName, setBookingName] = useState<string|null>(null)
    const [bookingTel, setBookingTelnum] = useState<string|null>(null)

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4'>
            <div className='text-xl font-medium text-black'>New Booking</div>
            <div className='text-xl font-medium text-black'>Venue : {name}</div>
            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-black'>Booking Contact & Place</div>
                <LocationDateBooking onDateChange={(value:Dayjs)=>{setBookingDate(value)}} onLocationChange={(value:string)=>setVenueLocation(value)} onNameChange={(value:string)=>setBookingName(value)} onTelnumChange={(value:string)=>setBookingTelnum(value)}/>  
            </div>
            <button className='block rounded-md bg-sky-600 hove:bg-indigo-600 px-3 py-2 shadow-sm text-white' name='Book Venue' onClick={makeBooking}>Book Venue</button>
        </main>
    );
}