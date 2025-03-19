'use client'
import { Inter } from 'next/font/google';
import styles from './card.module.css';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import InteractiveCard from './InteractiveCard';
import Image from 'next/image';

export default function Card({ venueName, imgSrc, onCompare }: { venueName: string, imgSrc: string, onCompare?: (venue: string, rating: number) => void }) {
    const [value, setValue] = React.useState<number | null>(0);
    
    return (
        <InteractiveCard contentName={venueName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc} alt="Venue Picture" fill={true} className="object-cover rounded-t-lg" />
            </div>
            <div className="w-full h-[30%] flex flex-col justify-between p-2 text-black">
                <div className="text-base font-semibold">{venueName}</div>
                {onCompare && ( 
                    <Rating id={venueName + " Rating"} name={venueName + " Rating"} data-testid={venueName + " Rating"} value={value}
                        onChange={(event, newValue) => {setValue(newValue); onCompare(venueName, newValue ?? 0);
                    }}/>
                )}
            </div>
        </InteractiveCard>
    );
}