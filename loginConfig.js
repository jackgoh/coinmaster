module.exports = function getConfig(deviceId, deviceChange, fbToken) {
    return {
    "Device[udid]": deviceId,
    API_KEY: "viki",
    API_SECRET: "coin",
    "Device[change]": deviceChange,
    "Client[version]": "3.5_fbweb",
    seq: 0
  }}
  
  