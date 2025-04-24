const Path = {
    home: "/",
    category: "/category/*",
    login: "/login",
    register: "/register",
    profile: "/profile",
    cart: "/cart",
    product: "/product/:id",
    address: "/address",
    checkout: "/checkout/*",
    order: "/order/:id",
    orderlist: "/orderlist",

    // category 
    mobile: "/category/mobile",
    laptop: "/category/laptop",
    tv: "/category/tv",
    audio: "/category/audio",
    speaker: "/category/speaker",
    smartwatch: "/category/smartwatch",
    teblet: "/category/teblet",

    // subCategory

    iphone: "/category/mobile/iphone",
    samsung: "/category/mobile/samsung",
    vivo: "/category/mobile/vivo",
    realme: "/category/mobile/realme",
    mi: "/category/mobile/mi",

    hp: "/category/laptop/hp",
    dell: "/category/laptop/dell",
    asus: "/category/laptop/asus",

    headphone: "/category/audio/headphone",
    wired: "/category/audio/wired",
    airbuds: "/category/audio/airbuds",
}

export default Path