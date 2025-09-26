import { headers } from "next/headers";
import { redirect } from "next/navigation";

const supportedLangs = ["en", "fr", "ar", "ur","ru","pt","es","de"];
const defaultLang = "en";

export default async function NotFoundRedirect() {
  const h = headers();
  const acceptLang = (await h).get("accept-language") || "";

  const userLang = acceptLang.split(",")[0]?.split("-")[0] || defaultLang;

  const lang = supportedLangs.includes(userLang) ? userLang : defaultLang;

  redirect(`/${lang}`);
}