import { PopularStations } from "./RadioCatalog/PopularStations";

export const Cats = () => {
    return (
        <div className="col-start-2 w-full overflow-visible pt-3">
            <PopularStations
                title="Set your favorite music"
                contentType="music"
            />
        </div>
    );
};
