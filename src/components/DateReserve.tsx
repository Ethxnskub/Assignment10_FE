'use client'
import {DatePicker} from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {Select,MenuItem} from '@mui/material'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { Dayjs } from 'dayjs'

export default function LocationDateBooking({onDateChange, onLocationChange, onNameChange, onTelnumChange}:{onDateChange:Function, onLocationChange:Function, onNameChange:Function, onTelnumChange:Function}){
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null);
    const [location, setLocation] = useState('Bloom')
    const [name, setName] = useState<string|null>(null)
    const [telnum, setTelnum] = useState<string|null>(null)
    
    return (
        <div className='bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center'>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className='bg-white' value={bookingDate} onChange={(value)=>{setBookingDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
            
            <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" fullWidth onChange={(e)=>{setName(e.target.value); onNameChange(e.target.value);}}/>
            <TextField variant="standard" name="Contact-Number" label="Contact-Number" fullWidth onChange={(e)=>{setTelnum(e.target.value); onTelnumChange(e.target.value);}}/>
            <Select variant='standard' name='venue' id='venue' value={location} onChange={(e)=>{setLocation(e.target.value); onLocationChange(e.target.value);}} className='h-[2em] w-[250px]'>
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
            </div>  
        </div>
    )
}
