/**
 * The class is to detect the device on which the application is running
 */
export default class DeviceDetector{

   static isMobileDevice = () => {
      const sizeLogicalPartial = (window.innerWidth <= 800);

      console.log(sizeLogicalPartial);
      return sizeLogicalPartial;

    }
}