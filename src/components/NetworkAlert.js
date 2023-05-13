import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

function NetworkAlert() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
        unsubscribe();
    }, []);

    if (!isConnected) {
        Alert.alert("No Internet Connection", "Please check your Internet connection.");
    }
    return null;
}

export default NetworkAlert;
