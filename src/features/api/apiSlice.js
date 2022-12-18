import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: ' http://localhost:9000',
    }),
    tagTypes: [ "Videos", "Video", "RelateVideos" ],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => ('/videos'),
            keepUnusedDataFor: 600,
            providesTags: ["Videos"],
        }),
        getSingleVideo: builder.query({
            query: (id) => (`/videos/${id}`),
            providesTags: (results, error, arg) => [
                { type: "Video", id: arg },
            ],
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(" ");
                const likes = tags.map(tag => `title_like=${tag}`);
                const queryString = `/videos?${likes.join("&")}&_limit=4`;
                return queryString;
            }, 
            providesTags: (results, error, arg) => [
                { type: "RelateVideos", id: arg.id },
            ],
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Videos"]
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (results, error, arg) => [
                "Videos",
                { type: "Video", id: arg.id },
                { type: "RelateVideos", id: arg.id },
            ],
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Videos"],
        }),
    }),
}); 

export const { useGetVideosQuery, useGetSingleVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = apiSlice;