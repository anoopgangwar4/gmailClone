import React, { useEffect, useState } from "react";
import Message from "./Message";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../redux/appSlice";

function Messages() {
  const dispatch = useDispatch();
  const { searchText, email } = useSelector((store) => store.appSlice);
  const [tempEmails, setTempEmails] = useState(email);
  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("timestamp", "desc"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();

        const ts = data?.timestamp;
        const timestamp = ts instanceof Timestamp ? ts.toMillis() : ts;
        return {
          id: doc.id,
          data: {
            ...data,
            timestamp,
          },
        };
      });

      console.log(messages);
      dispatch(setEmail(messages));
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    const filteredEmails = email.filter((item) => {
      const subject = item?.data?.subject || "";
      const message = item?.data?.message || "";
      return (
        subject.toLowerCase().includes(searchText.toLowerCase()) ||
        message.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setTempEmails(filteredEmails);
  }, [searchText, email]);

  return (
    <>
      {tempEmails &&
        tempEmails.map((item) => <Message key={item.id} email={item} />)}
    </>
  );
}

export default Messages;
