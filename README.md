# WhatsApp OTP Example With Ionic

WhatsApp OTP is used to confirm user's phone number. This is an alternative solution for confirming user phone number other than SMS OTP. SMS OTP is really expensive, it costs per sending or even per character in a message. WhatsApp OTP is cheaper and a more reliable solution.

In this example, I will be using [OTP Hub](https://otp-hub.com). The API costs only $2/month for an unlimited quota. I choose this API because it is cheap and also very easy to use and set up.

## Technologies

I will be using [Ionic React](https://ionicframework.com/docs/react) to demonstrate the OTP confirmation. Ionic is really awesome. You can have one codebase for website, Android, and iOS ready to go. Ionic also provide Vue and Angular templates.

### Setting Up

1. Clone the repo.
2. Run `npm i` in the terminal to install all the dependencies.
3. Run `npm run start` to start debugging the application using web browser.

### Debugging In Web Browser

After running `npm run start` you will be redirected into your default web browser. In Chrome you can right click the page and select inspect to debug it.

### Debugging In Android

To debug in Android, type `ionic capacitor add android` in the console. This will add the Android device to the project. You will have to install Android Studio first. You can read the detail [here](https://ionicframework.com/docs/developing/android).

### Debuggin In iOS

To debug in iOS, type `ionic capacitor add ios` in the console. This will add the iOS device to the project. You will need to run this from a MAC with XCode installed. You can read the detail [here](https://ionicframework.com/docs/developing/ios).

---

### Note

---

The code is made for demonstration purpose. All of the code is coded in the front end. If you want to follow the example, make sure that you code the:

* OTP generation
* API KEY 
* Calling the API to https://otp-hub.com
* Comparing the OTP

in the backend to ensure the security. Your API KEY should be a secret and cannot be shared to other people. Also you need to protect any phone number destination to be kept secret. 

This is the suggested flow:

> User press OTP button -> Back end server calls the API from [OTP Hub](https://otp-hub.com) -> User receive the OTP -> User input the OTP -> Back end server compare the OTP input by the user and the OTP sent -> If they match then grant the access to the user.