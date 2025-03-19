'use client'
import { useEffect, useReducer, useState } from "react";
import Card from "@/components/Card";
import { Link } from "@mui/material";
import getVenues from "@/libs/getVenues";


export default function CardPanel(){
    const [venueResponse, setVenueResponse] = useState<VenueJson|null>(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    },[])
    
    const compareReducer = (compareList: Map<string, number>, action: { type: string, venueName: string, rating: number }) => {
        switch (action.type) {
            case 'add': {
                return new Map(compareList.set(action.venueName, action.rating ?? 0));
            }
            case 'remove': {
                compareList.delete(action.venueName);
                return new Map(compareList);
            }
            case 'update': {
                if (action.rating !== undefined && action.rating > 0) {
                    return new Map(compareList.set(action.venueName, action.rating));
                } else if (compareList.has(action.venueName)) {
                    return new Map(compareList.set(action.venueName, action.rating ?? 0));
                }
                return compareList;
            }
            default:
                return compareList;
        }
    }

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]));

    // const mockVenueRepo = [{vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
    //     {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
    //     {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"}
    // ]
    
    if(!venueResponse) return (<p>Venue Panel is Loading...</p>)

    return (
        <div>
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap", padding: "10px" }}>
                {
                    venueResponse.data.map((venueItem:VenueItem)=>(
                        <Link href={`/venue/${venueItem.id}`} className="w-1/5" key={venueItem.id}>
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture} onCompare={(venue:string, rating:number)=> dispatchCompare({ type: 'update', venueName: venue, rating })}/>
                        </Link>
                        )
                    )
                }
            </div>
            <div className="w-full text-xl font-medium text-black">Venue List with Rating: {compareList.size}</div>
            {Array.from(compareList.entries()).map(([venue, rating]) => (
                <div data-testid={venue} className='text-black' key={venue} onClick={() => dispatchCompare({
                    type: 'remove', venueName: venue,
                    rating: 0
                })}>
                    {venue} Rating: {rating}
                </div>
            ))}
        </div>
    );
}