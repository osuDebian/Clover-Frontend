const MixinAddCommas = (txt) => {
    txt += '';
    var x = txt.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

const MixinAddSpaces = (txt) => {
    txt += '';
    var x = txt.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

const MixinTimeDifference = (beforedate, afterdate) => {
    if (typeof beforedate == "object"){
        beforedate = beforedate.getTime()/1000;
    }
    var sec = Math.floor(beforedate - afterdate);
    var interval = Math.floor(sec / 31536000);
    if (interval == 1) return "1 year";
    if (interval > 1) return interval + "years";

    interval = Math.floor(sec / 2592000);
    if (interval == 1) return "1 month";
    if (interval > 1) return interval + " months";

    interval = Math.floor(sec / 86400);
    if (interval == 1) return "1 day";
    if (interval > 1) return interval + " days";

    interval = Math.floor(sec / 3600);
    if (interval == 1) return "1 hour";
    if (interval > 1) return interval + " hour";

    interval = Math.floor(sec / 60);
    if (interval == 1) return "1 minute";
    if (interval > 1) return interval + " minutes";

    if (Math.floor(sec) == 1) return "1 second";
    return Math.floor(sec) + " seconds";
}

const MixinTimeSince = (date) => {
    if (typeof date == "object"){
        date = date.getTime()/1000;
    }
    var now = new Date();
    var currentTime = now / 1000;
    var sec = Math.floor(currentTime - date);

    var interval = Math.floor(sec / 31536000);
    if (interval == 1) return "about a year ago";
    if (interval > 1) return "about " + interval + "years ago";

    interval = Math.floor(sec / 2592000);
    if (interval == 1) return "about a month ago";
    if (interval > 1) return "about " + interval + " months ago";

    interval = Math.floor(sec / 86400);
    if (interval == 1) return "about a day ago";
    if (interval > 1) return "about " + interval + " days ago";

    interval = Math.floor(sec / 3600);
    if (interval == 1) return "about a hour ago";
    if (interval > 1) return "about " + interval + " hours ago";

    interval = Math.floor(sec / 60);
    if (interval == 1) return "about a minute ago";
    if (interval > 1) return "about " + interval + " minutes ago";

    return "about " + Math.floor(sec) + " seconds ago";
}

const MixinUinxTime = (t) => {
    var date = new Date(t * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2) + " (UTC+9)"; 
}

const MixinConvertMode = (mode) => {
    switch(mode) {
        default:
            return 0;
        case "osu":
            return 0;
        case "taiko":
            return 1;
        case "ctb":
            return 2;
        case "mania":
            return 3;
    }
}

const MixinConvertModeToText = (mode) => {
    switch(mode) {
        default:
            return "osu!";
        case 0:
            return "osu!";
        case 1:
            return "Taiko";
        case 2:
            return "Catch The Beat";
        case 3:
            return "osu!mania";
    }
}


const addCommas = (txt) => MixinAddCommas(txt);
const addSpaces = (txt) => MixinAddSpaces(txt);
const timeDifference = (before, after) => MixinTimeDifference(before, after);
const timeSince = (date) => MixinTimeSince(date);
const unixTIme = (t) => MixinUinxTime(t);
const convertMode = (mode) => MixinConvertMode(mode);
const convertModeToText = (mode) => MixinConvertModeToText(mode);
// const convertModeToText = (mode) => MixinConvertModeToText(mode);

const MIXIN = {
    addCommas,
    addSpaces,
    timeDifference,
    timeSince,
    unixTIme,
    convertMode,
    convertModeToText
};

export default MIXIN;