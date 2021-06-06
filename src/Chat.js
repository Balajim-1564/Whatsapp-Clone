import {Avatar, IconButton} from "@material-ui/core";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

export default function Chat() {
    const [input,setInput]=useState("");
    const [seed,setseed]=useState("");
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        if (roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>
                setRoomName(snapshot.data().name
            ));
            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
            )
        }
    },[roomId])

    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you typed >>>",input);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return (
        <div className="chat">
            <div className="header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="headerinfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>             
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="body">
                {messages.map((message)=>(
                    <p className={`message ${message.name===user.displayName &&"reciever"}`}>
                <span className="name">{message.name}</span>{message.message}
                <span className="timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span></p>
                ))}
                
                
            </div>
            <div className="footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)}placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}
