import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader"

export default function RelatedVideos({ id, title }) {
    const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery({id, title});

    let content = null;

    if(isLoading) {
        content = (
            <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
            </>
        )
    };
    if(!isLoading && isError) content = <Error />
   
    if(!isLoading && !isError && relatedVideos?.length === 0) {
        content = 'No relatedVideos available';
    }

    if(!isLoading && !isError && relatedVideos?.length > 0) {
        content = relatedVideos.map(video => <RelatedVideo key={video.id} video={video} />);
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
