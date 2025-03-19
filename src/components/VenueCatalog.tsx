import { Link } from "@mui/material";
import Card from "./Card";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
    const venuesJsonReady = await venuesJson;

    return (
        <>
            <div style={{ color: "black", marginBottom: "10px" }}>
                Explore {venuesJsonReady.count} venues in our catalog
            </div>
            <div style={{margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap", padding: "10px"}}>
                {venuesJsonReady.data.map((venueItem: VenueItem) => (
                    <Link key={venueItem.id} href={`/venue/${venueItem.id}`} className="w-1/5" underline="none">
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
                    </Link>
                ))
                }
            </div>
        </>
    );
}