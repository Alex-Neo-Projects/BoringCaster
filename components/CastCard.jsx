import {Text, View, Image, SafeAreaView} from 'react-native';

export default function CastCard({cast}) {
  const renderTextWithImages = () => {
    const regex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif))/gi;
    const matches = cast.text.match(regex);

    if (!matches) {
      return <Text style={{fontSize: 18}}>{cast.text}</Text>;
    }

    const parts = cast.text.split(regex);

    return (
      <View>
        {parts.map((part, index) => {
          if (matches.includes(part)) {
            return <Image key={index} source={{ uri: part }} style={{backgroundColor: '#EDEDED', borderRadius: 10, alignItems: 'flex-start', width: '100%', height: 300, resizeMode: 'contain', marginTop: 10}} />;
          }

          return <Text style={{fontSize: 18 }} key={index}>{part}</Text>;
        })}
      </View>
    );
  }

  return ( 
    <View style={{flex: 1, padding: 20, flexDirection: 'row', borderColor: 'black', borderWidth: 2, margin: 10, marginBottom: 5, borderRadius: 10}}>
      <View style={{flex: 1}}>
        <Image
          style={{height: 50, width: 50, borderRadius: 20}}
          source={{uri: cast.author.pfp.url}}
        />
      </View>

      <View style={{flex: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, paddingBottom: 6, flex: 1}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>{cast.author.displayName}</Text> <Text style={{color: '#373737', fontSize: 17}}>@{cast.author.username}</Text>
          </Text>
        </View>
        <View>
          {renderTextWithImages()}
        </View>
      </View>
    </View>
 );
}
