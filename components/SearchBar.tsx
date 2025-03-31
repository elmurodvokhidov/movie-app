import { icons } from '@/constants/icons'
import { View, Text, Image, TextInput } from 'react-native'

interface Props {
    onPress?: () => void;
    placeholder: string;
}

export default function SearchBar({ onPress, placeholder }: Props) {
    return (
        <View className='flex-row items-center bg-secondary rounded-full px-5 py-4'>
            <Image
                source={icons.search}
                className="size-5"
                resizeMode='contain'
                tintColor="#ab8bff"
            />

            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value=''
                onChangeText={() => { }}
                placeholderTextColor="#ab8bff"
                className='flex-1 ml-2 text-white'
            />
        </View>
    )
}