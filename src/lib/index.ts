export const checkIsPathnameIsEqualToLang = (pathname:string) => {
    if(pathname === "en" || pathname === "fr" || pathname === "ar" || pathname === "es" ||
     pathname === "zh-CN") {
        return true
    }

}

export const urlSplitter = (url:string) => {
    const splitUrl = url?.split("/")[1]
    return splitUrl
}