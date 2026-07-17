import { apiSlice } from "./apiSlice";

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.offset !== undefined) queryParams.append("offset", params.offset);
        if (params.limit !== undefined) queryParams.append("limit", params.limit);
        if (params.latitude !== undefined && params.latitude !== null) {
          queryParams.append("latitude", params.latitude);
        }
        if (params.longitude !== undefined && params.longitude !== null) {
          queryParams.append("longitude", params.longitude);
        }
        if (params.search) queryParams.append("search", params.search);
        if (params.price_range) queryParams.append("price_range", params.price_range);
        if (params.category) queryParams.append("category", params.category);

        return {
          url: `/api/v1/store?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getMenuCategories: builder.query({
      query: ({ storeId, search }) => {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        return {
          url: `/api/v1/menu/categories/${storeId}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getItemDetails: builder.query({
      query: ({ categoryId, itemId }) => ({
        url: `/api/v1/menu/categories/${categoryId}/item/${itemId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetStoresQuery, useGetMenuCategoriesQuery, useGetItemDetailsQuery } = storeApiSlice;
