/** 
 * App Configuration 
 * ----------------- 
 * This file contains all development-level app configurations. 
 * Not to be confused with user-configurable app settings like theme preferences. 
 *
 *Note: 
 * To connect to a local backend instead of production: Set isProduction to false 
 */

 const isProduction = false;

 interface Settings {
     rebotWebsocket: {
         isUserVisible: boolean;
         value: string;
     };
     apiBaseUrl: {
         isUserVisible: boolean;
         value: string;
     };
     authEndpoints: {
         isUserVisible: boolean;
         value: {
             login: string;
             signupStepOne: string;
             signupStepTwo: string;
             forgotPassword: string;
             resetPassword: string;
         };
     };
 }
 
 const DOMAINS = {
     production: "ec2-13-217-166-117.compute-1.amazonaws.com",
     local: "localhost"
 };
 
 const PORTS = {
     production: 8000,
     local: 8000
 };
 
 const BACKEND_DOMAIN = isProduction ? DOMAINS.production : DOMAINS.local;
 const BACKEND_PORT = isProduction ? PORTS.production : PORTS.local;
 const BACKEND_URL = `http://${BACKEND_DOMAIN}:${BACKEND_PORT}`;
 
 export const settings: Settings = {
     rebotWebsocket: {
         isUserVisible: false,
         value: `ws://${BACKEND_DOMAIN}:${BACKEND_PORT}/ws/rebot`
     },
     apiBaseUrl: {
         isUserVisible: false,
         value: BACKEND_URL
     },
     authEndpoints: {
         isUserVisible: false,
         value: {
             login: `${BACKEND_URL}/login`,
             signupStepOne: `${BACKEND_URL}/signup/step-one`,
             signupStepTwo: `${BACKEND_URL}/signup/step-two`,
             forgotPassword: `${BACKEND_URL}/forget-password/`,
             resetPassword: `${BACKEND_URL}/reset-password`
         }
     }
 };