import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const db = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const res = await db.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal("searchTerm", query),
            ]);

        if (res.documents.length > 0) {
            const existingMovie = res.documents[0];

            await db.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            )
        } else {
            await db.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.title,
                }
            )
        }
    } catch (error) {
        console.log("Error updating search count:", error);
        throw error;
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const res = await db.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc("count"),
            ]);

        return res.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log("Error fetching trending movies:", error);
        return undefined;
    }
};