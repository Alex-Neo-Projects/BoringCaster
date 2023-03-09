import {Text, TouchableOpacity} from 'react-native';

export function BoringButton({ onPress, innerText}) {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: 'black', borderRadius: 60, paddingTop: 30, paddingBottom: 30, padding: 20}}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{innerText}</Text>
    </TouchableOpacity>
 );
}
