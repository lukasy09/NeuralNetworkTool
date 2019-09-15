/**
 * The class is to detect the device on which the application is running
 */
export default class DeviceDetector{

   static isMobileDevice = () => {
       return (window.innerWidth <= 800);

    }
}