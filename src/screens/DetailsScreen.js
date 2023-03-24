import { StyleSheet, Text, View, Button } from "react-native";
import React,{useEffect} from "react";

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = React.useState([]);
  const getPlaces=async()=>{
    try{
      const response=await fetch("http://192.168.62.185:3000/api/place",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
      });
        const json = await response.json();
        setData(json);
    }catch(error){
      console.log(error)
    }
  };
  useEffect(() => {
    getPlaces();    
  }, []);
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
