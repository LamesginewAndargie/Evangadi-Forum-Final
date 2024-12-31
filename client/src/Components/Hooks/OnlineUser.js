import React, { useState } from 'react'
import axiosBase from '../config/axios';

function OnlineUser() {
        const [online, setOnline] = useState([]);
 const checkOnline = async () => {
   try {
     const { data } = await axiosBase.get("/user/online_status");
     setOnline(data.users);
   } catch (error) {
     console.log(error);
   }
 };
 return {online,checkOnline}
}

export default OnlineUser