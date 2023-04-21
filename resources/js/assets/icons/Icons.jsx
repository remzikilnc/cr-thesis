const favicon = ({size, fill}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={fill} role="img" height={size} width={size} viewBox="0 0 45 54.07">
            <defs>
                <pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 129 155">
                    <image width="129" height="155" xlinkHref="data:image/png;base64,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"/>
                </pattern>
            </defs>
            <rect id="ic" width="45" height="54.07" rx="22.5" fill="url(#pattern)"/>
        </svg>)
}

const searchIcon = ({size, fill}) => {
    return (
        <svg width={size} height={size} viewBox="1 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Search" transform="translate(2.000000, 2.000000)" stroke={fill} fill={"none"} strokeWidth="1.7">
                    <circle id="Ellipse_739" cx="9.76659044" cy="7.76659044" r="8.2885584"></circle>
                    <line x1="16.0183067" y1="15.4851259" x2="19.5423342" y2="20.0000001" id="Line_181"></line>
                </g>
        </svg>)
}
const notificationIcon = ({size, fill}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Notification" transform="translate(3.500000, 2.000000)" stroke={fill} fill={"none"} strokeWidth="1.5">
                <path
                    d="M8.5,15.8476424 C14.13923,15.8476424 16.7480515,15.1242108 17,12.220506 C17,9.31879687 15.1811526,9.50539234 15.1811526,5.94511102 C15.1811526,3.16414015 12.5452291,-1.86517468e-14 8.5,-1.86517468e-14 C4.4547709,-1.86517468e-14 1.81884743,3.16414015 1.81884743,5.94511102 C1.81884743,9.50539234 0,9.31879687 0,12.220506 C0.252952291,15.135187 2.86177374,15.8476424 8.5,15.8476424 Z"
                    id="Stroke-1"></path>
                <path d="M10.8887931,18.8572176 C9.52465753,20.3719337 7.3966462,20.3898948 6.0194615,18.8572176"
                      id="Stroke-3"></path>
            </g>
        </svg>)
}
const bookmarkIcon = ({size, fill}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Bookmark" transform="translate(4.200000, 2.300000)" stroke={fill} fill={"none"} strokeWidth="1.5">
                <path
                    d="M15.5388471,3.85363409 C15.5388471,1.10275689 13.6581454,-2.13162821e-14 10.9503759,-2.13162821e-14 L4.5914787,-2.13162821e-14 C1.96691729,-2.13162821e-14 2.66453526e-15,1.02756892 2.66453526e-15,3.67017544 L2.66453526e-15,18.393985 C2.66453526e-15,19.1197995 0.780952381,19.5769424 1.41353383,19.2220551 L7.79548872,15.6421053 L14.1223058,19.2160401 C14.7558897,19.5729323 15.5388471,19.1157895 15.5388471,18.3889724 L15.5388471,3.85363409 Z"
                    id="Stroke-1"></path>
                <line x1="4.071178" y1="6.72802013" x2="11.3894737" y2="6.72802013" id="Stroke-3"></line>
            </g>
        </svg>)
}
const dropDownIcon = ({size, fill}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M19.25 8.5L12.25 15.5L5.25 8.5" stroke={fill} fill={"none"} strokeWidth="1.5" strokeLinecap="square"/>
        </svg>)
}
const homeIcon = ({size, fill}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="/home" stroke="#ffffff" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Home" transform="translate(2.500000, 2.000000)" stroke={fill} strokeWidth="1.5" >
                    <path d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"></path>
                </g>
            </g>
        </svg>)
}
const discoveryIcon = ({size, fill}) => {
    return (
        <svg width={size}  height={size}  viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="/kesfet" stroke="#ffffff" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Discovery" transform="translate(2.000000, 2.000000)" stroke={fill}  strokeWidth="1.5" >
                    <polygon id="Path_33947" points="6.27002291 12.9519451 7.86270027 7.86270027 12.9519451 6.27002291 11.3592678 11.3592678"></polygon>
                    <circle id="Ellipse_738" cx="9.61098403" cy="9.61098403" r="9.61098403"></circle>
                </g>
            </g>
        </svg>)
}
const settingsIcon = ({size, fill}) => {
    return (
        <svg width={size}  height={size}  viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="/Settings" stroke="#ffffff" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Setting" transform="translate(2.500000, 1.500000)" stroke={fill}  strokeWidth="1.5" >
                    <path d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z" id="Path_33946"></path>
                    <circle id="Ellipse_737" cx="9.67505726" cy="10.3890161" r="2.63615562"></circle>
                </g>
            </g>
        </svg>)
}

const clockIcon = ({size, fill}) => {
    return (
        <svg width={size}  height={size}  viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Iconly/Light/Time-Square" stroke="#ffffff" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Time-Square" transform="translate(2.000000, 2.000000)" stroke={fill}  strokeWidth="1.5" >
                    <path d="M14.3347,0.7502 L5.6657,0.7502 C2.6447,0.7502 0.7507,2.8892 0.7507,5.9162 L0.7507,14.0842 C0.7507,17.1112 2.6347,19.2502 5.6657,19.2502 L14.3337,19.2502 C17.3647,19.2502 19.2507,17.1112 19.2507,14.0842 L19.2507,5.9162 C19.2507,2.8892 17.3647,0.7502 14.3347,0.7502 Z" id="Stroke-1"></path>
                    <polyline id="Stroke-3" points="13.3913 12.0177 10.0003 9.9947 10.0003 5.6337"></polyline>
                </g>
            </g>
        </svg>)
}
const collectionIcon = ({size, fill}) => {
    return (
        <svg fill={fill} role="img" height={size} width={size} xmlnsXlink="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24" data-encore-id="icon">
            <path
                d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path>
        </svg>)
}


const Icon = ({name, size = 24, fill = "currentColor"}) => {
    const icons = {
        favicon:favicon,
        search:searchIcon,
        notification:notificationIcon,
        bookmark:bookmarkIcon,
        dropdown:dropDownIcon,
        home:homeIcon,
        discovery:discoveryIcon,
        settings:settingsIcon,
        collection:collectionIcon,
        clock:clockIcon,
    }

    const Component = icons[name];

    if (!Component) {
        console.warn(`No icon found for the name "${name}"`);
        return null;
    }

    return <Component size={size} fill={fill} />;
}

export {Icon};
