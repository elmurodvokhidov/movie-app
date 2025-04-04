import { Link } from 'expo-router'
import { Text, TouchableOpacity, Image } from 'react-native'

export default function TrendingCard({
    movie: {
        movie_id,
        poster_url,
        title
    }
}: TrendingCardProps) {
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className='w-32 relative'>
                <Image
                    source={{ uri: poster_url }}
                    className='w-32 h-48 rounded-lg'
                    resizeMode='cover'
                />

                <Text className='text-sm font-bold mt-2 text-text' numberOfLines={2}>
                    {title}
                </Text>

            </TouchableOpacity>
        </Link>
    )
}