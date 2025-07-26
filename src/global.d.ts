declare module "*.json" {
  import { GoogleCredentials } from "./types/googleCredentials";
  const value: GoogleCredentials;
  export default value;
}
