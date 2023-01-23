import React from "react";
import { Datacheckusers } from "./userData";

import { firebase } from '../../config';

const CheckUsers = () =>{
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('Users');

    useEffect( () => {
        todoRef.onSnapshot(
          querySnapshot =>{
            const users = []
            querySnapshot.forEach((doc) =>{
              const {name, uri} = doc.data()
              if (doc.data().role == 'customer' && {password: doc.data().password, username: doc.data().username} == Datacheckusers) {
                users.push({
                  id:doc.id,
                })
              }else{}
            })
            setUsers(users)
          }
        )
      }, [])
}
export default CheckUsers;