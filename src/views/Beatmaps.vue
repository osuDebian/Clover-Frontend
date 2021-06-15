<script>
import $ from 'jquery'
export default {
    name: 'Beatmaps',
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            tab: 'beatmaps',
            playing: false,
            bid: this.$route.params.id,
            relax: this.$route.query.relax,
            mode: this.$route.query.mode,
            page: 0,
            load: true,
            data: [],
            hoverbid: 0,
        }
    },
    watch: {
        bid() {
            this.getData();
        },
        relax() {
            this.getData();
        },
        mode() {
            this.getData();
        },
        page() {
            this.getData();
        },
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            var vm = this;
            vm.checkparams();
            window.history.replaceState('', document.title, "/beatmaps/" + vm.bid + "?mode=" + vm.mode + "&relax="+vm.relax);
            await vm.$axios({
                url: 'https://new.debian.moe/api/v1/beatmap/scores',
                method: 'get',
                params: {
                    "beatmap_id": vm.bid,
                    "relax": vm.relax,
                    "mode": vm.mode,
                    "page": vm.page
                }
            })
            .then(response => {
                vm.data = response.data;
                vm.hoverbid = response.data.Beatmap.beatmap_id;
                vm.load = false;
            })
        },
        diffColor(diff){
            diff = diff / 10;
            if (diff < 2) {
                return "#88B300"
            }
            if (diff < 2.7) {
                return "#66CCFF"
            }
            if (diff < 4) {
                return "#efb804"
            }
            if (diff < 5.3) {
                return "#FF66AA"
            }
            if (diff < 6.5) {
                return "#8866EE"
            }
            if (diff > 6.49) {
                return "#000"
            }
        },
        percentFormat(percentage) {
            percentage = (percentage / 10).toFixed(2).replace(/\.?0+$/, '');
            return percentage
        },
        checkparams(){
            var vm = this;
            if (vm.mode == null) {
                vm.mode = 0;
            }
            if (vm.relax == null) {
                vm.relax = 0;
            }
        },
        secondsToTime(time){
            
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = ~~time % 60;
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },
        convertPercent(before){
            var after = before * 10
            return after
        },
        convertDiffToClass(diff){
            if (diff < 2) {
                return "easy"
            }
            if (diff < 2.7) {
                return "normal"
            }
            if (diff < 4) {
                return "hard"
            }
            if (diff < 5.3) {
                return "insane"
            }
            if (diff < 6.5) {
                return "expert"
            }
            if (diff > 6.49) {
                return "expertplus"
            }
        },
        convertModeToico(mode){
            var result;
            switch(mode){
                default:
                case 0:
                    result = "osu";
                    break;
                case 1:
                    result = "taiko";
                    break;
                case 2:
                    result = "fruits";
                    break;
                case 3:
                    result = "mania";
                    break;
            }
            return result; 
        },
        addCommas(nStr){
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        addSpaces(nStr){
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ' ' + '$2');
            }
            return x1 + x2;
        },
        timeDifference: function(date1, date2) {
            if (typeof date1 === "object"){
                date1 = date1.getTime()/1000;
            }
            var seconds = Math.floor(date1 - date2);
            var interval = Math.floor(seconds / 31536000);

            if (interval === 1) return "1 year";
            if (interval > 1) return interval + " years"
               
            interval = Math.floor(seconds / 2592000);
            if (interval === 1) return "1 month";
            if (interval > 1) return interval + " months";
                
                
            interval = Math.floor(seconds / 86400);
            if (interval === 1) return "1 day";
            if (interval > 1) return interval + " days";
            
            interval = Math.floor(seconds / 3600);
            if (interval === 1) return "1 hour";
            if (interval > 1) return interval + " hours";
                
            interval = Math.floor(seconds / 60);
            if (interval === 1) return "1 minute";
            if (interval > 0) return interval+" minutes";

            if (Math.floor(seconds) === 1) return "1 second";
            return Math.floor(seconds) + " seconds";
            
        },
        timeSince: function(date) {
            if (typeof date === "object"){
                date = date.getTime()/1000;
            }
            var now = new Date();
            var currentTime = now / 1000;
            var seconds = Math.floor(currentTime - date);
        
            var interval = Math.floor(seconds / 31536000);
        
            if (interval > 1) {
                return interval + " years ago";
            }if (interval === 1){
                return "about a year ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) { 
                return interval + " months ago";
            }if (interval === 1){
                return "about a month ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days ago";
            }if (interval === 1){
                 interval = Math.floor(seconds / 3600);
                return "about " + interval + " hours ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return "about " + interval + " hours ago";
            }if (interval === 1){
                return "about a hour ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return "about " + interval + " minutes ago";
            }if (interval === 1){
                return "about a minute ago";
            }
            if (seconds < 0){
                console.log(date, currentTime);
            }
            return "about " + Math.floor(seconds) + " seconds ago";
        },
        convertRankedStatusToText(rankedstatus){
            var result;
            switch(rankedstatus){
                default:
                case 0:
                    result = "Unranked";
                    break;
                case 2:
                    result = "Ranked";
                    break;
                case 3:
                    result = "Ranked";
                    break;
                case 4:
                    result = "Qualified";
                    break;
                case 5:
                    result = "Loved";
                    break;
            }
            return result; 
        },
        unixToTime(t){
            var date = new Date(t*1000);
            var year = date.getFullYear();
            var month = "0" + (date.getMonth()+1);
            var day = "0" + date.getDate();
            var hour = "0" + date.getHours();
            var minute = "0" + date.getMinutes();
            var second = "0" + date.getSeconds();
            return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2) + " (UTC+9)";
        },
        onFinish: function() {
            this.playing = false;
            var vm = this;
            var id = vm.data.Beatmap.beatmapset_id;
            var audio = $('#audio_' + id)[0];
            audio.pause();
            audio.currentTime = 0;
        },
        play: function() {
            var audioElement = window.audioElement;
            var vm = this;
            if (audioElement && audioElement.currentTime > 0) {
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement = null;
                window.audioElement = null;
                if (vm.playing) {
                    vm.playing = false;
                    return;
                }
            }
            if (!audioElement) {
                audioElement = document.createElement('audio');
                window.audioElement = audioElement;
            }
            audioElement.setAttribute('src', 'https://b.ppy.sh/preview/' + vm.data.Beatmap.beatmapset_id + '.mp3');
            audioElement.addEventListener('loadeddata', function() {
                if (vm.playing) return;
                vm.playing = true;
                audioElement.volume = 0.2;
                audioElement.play();
            });

            audioElement.addEventListener('ended', function() {
                vm.playing = false;
                window.audioElement = null;
            }, false);

            audioElement.addEventListener('pause', function() {
                vm.playing = false;
                // return
            }, false);
        }
    }
}
</script>

<style>
    @font-face {
        font-family: FontAwesomeExtra;
        src: url(../assets/fonts/extra.ttf) format("truetype")
    }

	.spin {
		animation-name: spin;
		animation-duration: 1.5s;
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0, -0.09, 0.18, 1.08);
	}

	@keyframes spin {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}

    .faa {
        font-family: FontAwesomeExtra;
    }

    .fa-extra-mode-osu:before {
        content: "\E800";
    }

    .fa-extra-mode-fruits:before {
        content: "\E801";
    }

    .fa-extra-mode-mania:before {
        content: "\E802";
    }

    .fa-extra-mode-taiko:before {
        content: "\E803";
    }

    /* ?Beatmap Header */
    div.beatmap-information > div.beatmap-header {
        background-color: #221F42;
        display: flex;
        position: relative;
        padding: 0.25em 1em;
        border-radius: 5px 5px 0 0;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 0;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info > div.beatmap-header-icon {
        background-image: url("../assets/images/beatmapsets.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 44px;
        height: 44px;
        color: white;
        display: flex;
        margin-right: 1em;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info > span {
        color: white;
        font-size: 1.5em;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-mods {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto;
    }

    div.beatmap-header-mods > div.beatmap-mods {
        margin-right: 15px;
    }

    div.beatmap-header-mods > div.beatmap-mods:last-child {
        margin-right: 0 ;
    }

    div.beatmap-header-mods > div.beatmap-mods > a.beatmap-mods-a {
        cursor: pointer;
    }

    div.beatmap-thumb {
        width: 100%;
        height: 270px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(../assets/images/beatmaps-default.png);
        display: flex;
        position: relative;
    }

    div.beatmap-thumb::before {
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background-image: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.65));
    }

    .beatmap-tooltip {
        font-size: 13px !important;
        text-align: center;
    }


    .version-list-hover-block {
        display: none;
        padding: 8px 12px;
        /* display: inline-flex; */
        background-color: #3b3c40;
        border-top: 1px solid #282c2f;
        flex-basis: 45px;
        flex-wrap: wrap;
        align-items: center;
        overflow: hidden;
        width: 100%;
    }

    .version-hoverlist-single {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .version-main-info {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .version-basic-info {
        display: flex;
        margin-bottom: 6px;
        justify-content: center;
    }

    .version-more-info {
        display: flex;
        flex-direction: column;
    }

    .version-more-info-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 6px;
    }

    .version-more-info-line-last {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .version-more-info-text {
        flex: 1;
        padding-right: 8px;
    }

    .version-more-info-line > .el-progress {
        flex: 2;
    }
    .version-more-info-line-last > .el-progress {
        flex: 2;
    }

    .version-info-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 6px;
        color: #ca8811;
        font-weight: bold;
    }

    .version-info-line-last {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #ca8811;
        font-weight: bold;
    }

    .version-ico {
        width: 24px;
        height: 24px;
        background-size: contain;
        margin-right: 3px;
    }

    .version-ico.length {
        background-image: url(../assets/images/total_length.svg);
    }

    .version-ico.bpm {
        background-image: url(../assets/images/bpm.svg);
    }

    .version-ico.circlecount {
        background-image: url(../assets/images/count_circles.svg);
    }

    .version-ico.slidercount {
        background-image: url(../assets/images/count_sliders.svg);
    }

    .version-diff {
        padding: 2px 8px;
        background: #9a8908;
        text-align: center;
        vertical-align: middle;
        line-height: 1px;
        border-radius: 10px;
        margin-right: 6px;
    }
    
    .version-diff-txt {
        color: white;
    }

    .version-name {
        line-height: 2px;
        font-weight: bold;
        margin-right: 6px;
        color: black !important;
    }

    .version-info {
        display: flex;
        flex-direction: column;
        width: 350px;
    }

    div.beatmap-diff-block {
        display: inline-block;
        flex-direction: column;
        position: absolute;
        color: white;
        margin: 20px;
        padding: 0;
    }

    div.beatmap-diffs {
        display: inline-flex;
        /* padding: 10px; */
        background: #00000080;
        border-radius: 15px;
    }

    div.beatmap-map-info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }

    div.beatmap-diff-name {
        font-size: 1.2em;
        margin-top: 6px;
        text-shadow: -2px 0 #313131, 0 2px #313131, 2px 0 #313131, 0 -2px #313131, 0 0 5px #000;
        /* padding: 2px 5px; */
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    div.beatmap-map-name {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        text-shadow: -2px 0 #313131, 0 2px #313131, 2px 0 #313131, 0 -2px #313131, 0 0 5px #000;
    }

    span.beatmap-map-name-title {
        font-weight: bold;
        font-size: 2em;  
    }

    span.beatmap-map-name-artist {
        font-size: 1.15em;
    }

    span.beatmap-diff-name {
        margin-right: 4px;
    }

    span.beatmap-diff-star {
        display: block;
        color: #ffdfbf;
        font-size: 0.8em;
    }

    /* div.beatmap-diff:first-child {
        padding: 10px 5px 10px 10px;
    }

    div.beatmap-diff:last-child {
        padding: 10px 10px 10px 5px;
    } */

    div.beatmap-diffs-tooltip {
        padding: 20px 35px;
        background-color: #252525f6 !important;
    }

    .mode-ico {
        font-size: 18px !important;
        color: white;
        margin-right: 5px;
        padding: 2px;
    }

    div.beatmap-diff {
        padding: 10px 7.5px;
        border-radius: 15px;
        transition: background-color 200ms ease-in-out;
    }

    div.beatmap-diff:hover {
        padding: 10px 7.5px;
        border-radius: 15px;
        background: #170e0ea1;
        box-shadow: 0 0 0 2px #a5a5a5 inset;
    }

    div.beatmap-diff:hover > a.beatmap-diff-icon {
        text-shadow: #000 0px 0px 5px;
        transform: scale(1.08);
    }

    div.beatmap-diff-now {
        padding: 10px 7.5px;
        border-radius: 15px;
        background: #775050a1;
        box-shadow: 0 0 0 3px #fff inset;
    }

    a.beatmap-diff-icon-now {
        text-shadow: #000 0px 0px 5px;
        font-size: 26px;
        cursor: pointer;
        display: block;
        transition: transform 100ms ease-in-out;
        transform: scale(1.08);
    }

    a.beatmap-diff-icon {
        font-size: 26px;
        cursor: pointer;
        display: block;
        transition: transform 100ms ease-in-out;
    }

    div.beatmap-ranked-status {
        margin: 20px;
        margin-left: auto;
        background: #444947d9;
        display: flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        padding: 0px 35px;
        color: white;
        border-radius: 20px;
        text-transform: uppercase;
        font-weight: bold;
        text-shadow: 0px 2px 5px black;
        z-index: 1234;
    }

    div.beatmap-main {
        display: flex;
        flex-direction: row;
    }

    div.beatmap-info {
        display: flex;
        flex: 2 2 0;
        padding: 1.5em 3em;
    }

    div.beatmap-info-main {
        display: flex;
        flex-direction: column;
    }

    span.beatmap-info-main-title {
        font-weight: bold;
        font-size: 2em;  
    }

    span.beatmap-info-main-artist {
        font-size: 1.15em;
    }

    div.beatmap-stats {
        flex: 1 1 0;
        padding: 1.5em;
        background: #dedede;
        border-radius: 0 0 6px;
    }

    div.beatmap-users-block {
        display: flex;
        justify-content: space-around;
    }

    a.beatmap-user-block {
        font-weight: 500;
        color: #494949;
        display: flex;
        min-width: 0;
        /* flex: 1 auto; */
    }

    .without a.beatmap-user-block:first-child::after {
        content: "";
        width: 2px;
        height: 100%;
        position: relative;
        margin: 0 6px;
        background-color: #777;
    }

    div.beatmap-user-avatar, div.beatmap-user-avatar-debian {
        width: 64px;
        height: 64px;
        margin: 0 8px 0 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 6px;
        background-color: #444;
        min-width: 38px;
        box-shadow: 0px 4px 0px #ff3535, 0px 4px 8px #000;
    }
    
    div.beatmap-user-avatar-debian {

        box-shadow: 0px 4px 0px #35a4ff, 0px 4px 8px #000;
    }

    span.beatmap-user-name, div.beatmap-user-name {
        color: black;
    }

    span.beatmap-user-name {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    div.beatmap-user-name {
        font-weight: 800;
        font-size: 17px;
    }

    .easy {
        color: #88B300;
    }

    .normal {
        color: #66CCFF;
    }

    .hard {
        color: #FFCC22;
    }

    .insane {
        color: #FF66AA;
    }

    .expert {
        color: #8866EE;
    }

    .expertplus {
        color: #000;
    }

    .ver-easy {
        background-color: #67840e !important;
    }

    .ver-normal {
        background-color: #4a97bd !important;
    }

    .ver-hard {
        background-color: #c19c21 !important;
    }

    .ver-insane {
        background-color: #d04b86 !important;
    }

    .ver-expert {
        background-color: #6d52bb !important;
    }

    .ver-expertplus {
        background-color: #000 !important;
    }

    @media screen and (max-width: 300px) {
        div.beatmap-header-mods > div.beatmap-mods { margin-right: 10px }
    }

    @media screen and (max-width: 767px) {
        div.beatmap-header { flex-direction: column; }
        div.beatmap-information > div.beatmap-header > div.beatmap-header-info { margin: 0 auto; }
        div.beatmap-information > div.beatmap-header > div.beatmap-header-mods { margin-left: 0; margin: 0 auto; }
        div.beatmap-header-mods > div.beatmap-mods:last-child { margin-right: 0; }
        div.beatmap-main { flex-direction: column; }
    }
    
    @media screen and (min-width: 768px) and (max-width: 1279px) {

    }

    @media screen and (min-width: 1280px) {
        
    }

</style>

<template>
<div>
    <section>
        <!-- test | bid: {{ bid }} mode: {{ mode }} relax: {{ relax }} page: {{ page }} -->
        <div class="beatmap-information">
            <div class="beatmap-header">
                <div class="beatmap-header-info">
                    <div class="beatmap-header-icon"></div>
                    <span>비트맵 정보</span>
                </div>
                <div class="beatmap-header-mods">
                    <div class="beatmap-mods">
                        <a class="beatmap-mods-a" v-on:click="mode=0">osu!</a>
                    </div>
                    <div class="beatmap-mods">
                        <a class="beatmap-mods-a" v-on:click="mode=1">osu!taiko</a>
                    </div>
                    <div class="beatmap-mods">
                        <a class="beatmap-mods-a" v-on:click="mode=2">osu!catch</a>
                    </div>
                    <div class="beatmap-mods">
                        <a class="beatmap-mods-a" v-on:click="mode=3">osu!mania</a>
                    </div>
                </div>
            </div>
            <div class="beatmap-thumb" :style="'background-image: url(https://assets.ppy.sh/beatmaps/' + data.Beatmap.beatmapset_id + '/covers/cover@2x.jpg), url(data:image/png;base64,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)'">
                <div class="beatmap-diffs" v-if="load">
                    <div class="beatmap-diff">
                        <i class="fad fa-spinner spin"></i> Loading...
                    </div>
                </div>
                <div v-else class="beatmap-diff-block">
                    <div class="beatmap-diffs">
                        <div v-for="(bmp, index) in data.Beatmaps" v-bind:key="index.id" :class="bid == bmp.beatmap_id ? 'beatmap-diff-now' : 'beatmap-diff'" v-on:click="bid = bmp.beatmap_id" v-on:mouseover="hoverbid = bmp.beatmap_id" v-on:mouseleave="hoverbid = data.Beatmap.beatmap_id">
                            <a v-on:click="bid = bmp.beatmap_id" :class="bid == bmp.beatmap_id ? 'beatmap-diff-icon faa fa-extra-mode-' + convertModeToico(bmp.mode) + ' ' + convertDiffToClass(bmp.Difficulty) : 'beatmap-diff-icon faa fa-extra-mode-' + convertModeToico(bmp.mode) + ' ' + convertDiffToClass(bmp.Difficulty)"></a>
                        </div>
                    </div>
                    <div class="beatmap-map-info" v-for="(bmp, index) in data.Beatmaps" v-bind:key="index.id">
                        <div class="beatmap-diff-name" v-if="hoverbid == bmp.beatmap_id">
                            <span class="beatmap-diff-name" id="beatmap-diff">{{ bmp.Diffname }}</span>
                            <span class="beatmap-diff-star" id="beatmap-star">
                                <i class="fas fa-star"></i> {{ bmp.Difficulty.toFixed(2) }}
                            </span>
                        </div>
                        <div class="beatmap-map-name" v-if="hoverbid == bmp.beatmap_id">
                            <span class="beatmap-map-name-title">{{ data.Beatmap.title }}</span>
                            <span class="beatmap-map-name-artist">{{ data.Beatmap.artist }}</span>
                        </div>
                    </div>
                </div>
                <div class="beatmap-ranked-status" v-if="load">
                    <i class="fad fa-spinner spin"></i> Loading...
                </div>
                <div class="beatmap-ranked-status" v-else>
                    {{ convertRankedStatusToText(data.Beatmap.Ranked) }}
                </div>
            </div>
            <div class="beatmap-main">  
                <div class="beatmap-info">
                    <div class="version-hoverlist-single" v-for="(bmp, index) in data.Beatmaps" v-bind:key="index.id">
                        <div class="version-info" v-if="hoverbid == bmp.beatmap_id">
                            <div class="version-basic-info">
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Total Length
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico length"></div>{{ secondsToTime(bmp.TotalLength) }}
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        BPM
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico bpm"></div>{{ bmp.BPM }}
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Circle Count
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico circlecount"></div>{{ addCommas(bmp.CircleCount) }}
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Slider Count
                                    </div>
                                    <div class="version-info-line-last">
                                        <div class="version-ico slidercount"></div>{{ addCommas(bmp.SliderCount) }}
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="version-more-info">
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Circle Size</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(bmp.CS)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">HP Drain</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(bmp.HP)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Accuracy</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(bmp.OD)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Approach Rate</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(bmp.AR)"></el-progress>
                                </div>
                                <div class="version-more-info-line-last">
                                    <span class="version-more-info-text">Star Difficulty</span>
                                    <el-progress :text-inside="true" :format="percentFormat" :color="diffColor" stroke-width="16" :percentage="convertPercent(parseFloat(bmp.Difficulty.toFixed(2)))"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="beatmap-stats">
                    <div class="beatmap-users-block">
                        <a href="#" class="beatmap-user-block">
                            <div class="beatmap-user-avatar" :style="'background-image: url(https://a.debian.moe/bancho/u/' + data.Beatmap.Creator + ');'"></div>
                            <span class="beatmap-user-name">
                                Mapped by
                                <div class="beatmap-user-name">
                                    {{ data.Beatmap.Creator }}
                                </div>
                            </span>
                        </a>
                        <a href="#" class="beatmap-user-block" v-if="data.Beatmap.RankedbyID != 0">
                            <div class="beatmap-user-avatar-debian" :style="'background-image: url(https://a.debian.moe/' + data.Beatmap.RankedbyID + ');'"></div>
                            <span class="beatmap-user-name">
                                {{ convertRankedStatusToText(data.Beatmap.Ranked) }} by
                                <div class="beatmap-user-name">
                                    {{ data.Beatmap.Rankedby }}
                                </div>
                            </span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section>
        <div>
            scrore line
        </div>
    </section>
</div>
</template>