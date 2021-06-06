import React, { useEffect, useState } from 'react';
import {Avatar} from "@material-ui/core";
import "./SidemenuChat.css";
import db from "./firebase";
import { Link } from 'react-router-dom';

export default function SidemenuChat({id,name,addNewChat}) {
    const [seed,setseed]=useState("");
    const [messages,setMessages]=useState("")

    useEffect(()=>{
        if (id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").
            onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>
                doc.data()
                ))
            ))
        }
    })

    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
    }, [id]);

    const createChat=()=>{
            const roomName=prompt("please enter for chat");
            if(roomName){
                db.collection("rooms").add({
                    name:roomName,
                })
            }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidemenuChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        
    ):(
        <div onClick={createChat} className="sidemenuChat">
            <h2>Add new Chat</h2>
        </div>
    );
}
