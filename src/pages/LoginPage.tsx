import { IonButton, IonCard, IonInput, IonLabel, IonTitle } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import './LoginPage.css'

//Get API TOKEN From https://otp-hub.com/account
const API_TOKEN = "b79bb24ca4304baa913a06e9583da422";
const API_URL = "https://otp-hub.com/api/v1/otp";
//Destination phone number
const OTP_DESTINATION = "6285317899367";

export default function LoginPage() {

  const [showInput, setShowInput] = useState(false);
  const [cd, setCd] = useState(0);
  const [sending, setSending] = useState(false);
  const [inputOTP, setInputOTP] = useState<string | undefined | null>("");

  useEffect(() => {
    if (cd > 0) {
      setTimeout(() => setCd((prev) => prev - 1), 1000);
    }
  }, [cd]);

  const sendOTP = async () => {
    if (cd === 0) {
      setSending(true);
      let res = await postOTP();
      setCd(60);
      setShowInput(true);
      setSending(false);
      if (res.success) {
        alert("Success! OTP is sent");
      } else {
        //Something is wrong
      }
    }
  }

  //The code bellow should be coded in the back end, it should not be coded
  //in the front end for security.

  const [otp, setOTP] = useState<string>();

  const postOTP = async () => {
    try {
      //Generate 6 digit OTP
      let generatedOTP = generateOTP();
      //Store the generated OTP in the back end, for comparing later
      setOTP(generatedOTP);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + API_TOKEN
        },
        body: JSON.stringify({
          otp: generatedOTP,
          to: OTP_DESTINATION
        })
      });
      return response.json();
    } catch (err) {
      //Something is wrong
    }
    return undefined;
  }

  const generateOTP = () => {
    return Math.round((Math.random() * 999999)).toString().padStart(6, '0');
  }

  const compareOTP = () => {
    if (otp === inputOTP) {
      alert("Your OTP Match! Proceed to login...");

      //Redirect user to after login page
    }
  }

  //////////////////////

  return (
    <div className='LoginPage'>
      <IonCard className='card'>
        <IonTitle className='ion-text-center'>Login</IonTitle>
        <hr />
        {
          !showInput ?
            <IonButton disabled={sending} onClick={sendOTP}>{sending ? "Sending..." : "Send OTP"}</IonButton> :
            <div className='ion-text-center'>
              <IonInput onIonChange={(e) => setInputOTP(e.detail.value)} value={inputOTP} className='otp-input' placeholder='000000' />
              <IonButton onClick={compareOTP}>Submit</IonButton>
              <br />
              <br />
              <div>
                <IonLabel
                  onClick={sendOTP}
                  className={cd > 0 ? 'disabled' : 'active'}>
                  {sending ? "Re-sending..." : cd > 0 ? "Resend in " + cd + " seconds" : "Resend OTP"}
                </IonLabel>
              </div>
            </div>
        }
      </IonCard>
    </div>
  )
}
