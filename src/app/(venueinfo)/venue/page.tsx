import getVenues from "@/libs/getVenues"
import VenueCatalog from "@/components/VenueCatalog"
import CardPanel from "@/components/CardPanel"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { VenueJson } from "../../../../interface"

export default async function Venue(){
    const venuesPromise: Promise<VenueJson> = getVenues()

    
    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium text-black">
                Select Your Event Venue
            </h1>
            <Suspense fallback={<p className="text-black">Loading... <LinearProgress /></p>}>
                <VenueCatalog venuesJson={venuesPromise} />
            </Suspense>
            {/* <hr className="my-10"/>
            <h1 className="text-xl font-medium text-black">TRY Client-Side Venue Panel</h1>
            <CardPanel/> */}
        </main>
    )
}