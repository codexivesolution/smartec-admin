import moment from "moment";
import { db } from "../../firebaseConfig";
import firebase from "firebase";
import { GET_NOTIFICATION } from "./actionTypes";

export const getNotification = (id) => (dispatch) => {

  const date = firebase.firestore.Timestamp.fromDate(new Date(moment(new Date()).subtract(30, 'd').format('YYYY-MM-DD'))).toDate()

  const unsubscribe = db
    .collection("notification")
    .orderBy("timestamp", "desc")
    .where("reciever", "==", id)
    .where('timestamp', '>=', date)
    .onSnapshot(
      (snapshot) => {
        if (snapshot.docs) {
          let data = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          dispatch({
            type: GET_NOTIFICATION,
            payload: data
          });
        }
      },
      (err) => {
        console.log("Error in getNotification: ", err);
      }
    );
  return unsubscribe;
};