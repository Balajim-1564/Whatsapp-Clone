import React, { useEffect, useState } from 'react'
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {RoomService, SearchOutlined} from "@material-ui/icons";
import sidemenu from "./Sidemenu.css"
import SidemenuChat from './SidemenuChat';
import db from "./firebase";
import { useStateValue } from './StateProvider';

export default function Sidemenu() {

    const [rooms,setRooms]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        const unsubscribe=db.collection("rooms").onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
    ))
    return ()=>{
        unsubscribe();
    }
    },[])

    return (
        <div className="sidemenu">
            <div className="header">
                <Avatar src={user?.photoURL}/>
                <div className="headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>             
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="search">
                <div className="searchContainer">
                    <SearchOutlined/>
                     <input placeholder="Search or start a new chat" type="text"/>
                </div>
            </div>
            <div className="chats">
                <SidemenuChat addNewChat/>
                {rooms.map((room)=>(
                    <SidemenuChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}
