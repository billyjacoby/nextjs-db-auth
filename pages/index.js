import checkAuthServer from "../util/checkAuthServer";

export { default } from "./auth/login";

export async function getServerSideProps(context) {
  return checkAuthServer(context);
}
