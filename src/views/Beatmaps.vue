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
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'Beatmaps Page',
        // all titles will be injected into this template
        titleTemplate: '[BETA] %s | Debian!'
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
            BeatmapMirrorData: [],
            TopScore: [],
            Tags: [],
            hoverbid: 0,
            beatmapinfo: {
                "Diffname": "",
                "Difficulty": 0,
                "TotalLength": 0,
                "BPM": 0,
                "CircleCount": 0,
                "SliderCount": 0,
                "AR": 0,
                "OD": 0,
                "HP": 0,
                "CS": 0
            },
            beatmapcount: {
                "std": 0,
                "taiko": 0,
                "ctb": 0,
                "mania": 0
            }
        }
    },
    watch: {
        bid() {
            this.getAllData();
        },
        relax() {
            this.getAllData();
        },
        mode() {
            this.getAllData();
        },
        page() {
            this.getData();
        },
        hoverbid() {
            this.getSubData(this.hoverbid);
        }
    },
    created() {
        this.getAllData();
    },
    computed: {
        BeatmapDescription:function() {
            var vm = this;
            var description = vm.data.Beatmap.description;
            return description
        }
    },
    methods: {
        async getAllData() {
            var vm = this;
            vm.load = true;
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
                this.countingBeatmap();
                this.getBeatmapMirrorData();
            })
        },
        async getBeatmapMirrorData() {
            var vm = this;
            vm.load = true;
            fetch("https://api.nerina.pw/beatmapset/" + vm.data.Beatmap.beatmapset_id)
            .then((response) => response.json())
            .then((data) => {
                vm.BeatmapMirrorData = data[0];
                vm.TagSlice(vm.BeatmapMirrorData.tags);
                vm.getTopScore();
                vm.load = false;
            });
        },
        async getData() {
            var vm = this;
            vm.load = true;
            vm.checkparams();
            window.history.replaceState('', document.title, "/beatmaps/" + vm.bid + "?mode=" + vm.mode + "&relax="+vm.relax);
            await vm.$axios({
                url: 'https://new.debian.moe/api/v1/beatmap/score',
                method: 'get',
                params: {
                    "beatmap_id": vm.bid,
                    "relax": vm.relax,
                    "mode": vm.mode,
                    "page": vm.page
                }
            }) 
            .then(response => {
                vm.data.Scores = response.data;
                vm.load = false;
            })
        },
        getScoreMods(m, plus=true){
            /* eslint-disable */ 
            var NoFail = 1, Easy = 2, NoVideo = 4,  Hidden = 8,  HardRock = 16,  SuddenDeath = 32,  DoubleTime = 64,  Relax = 128,  HalfTime = 256,  Nightcore = 512, Flashlight = 1024,  Autoplay = 2048,  SpunOut = 4096,  Relax2 = 8192,  Perfect = 16384,  Key4 = 32768,  Key5 = 65536,  Key6 = 131072,  Key7 = 262144,  Key8 = 524288,  keyMod = 1015808,  FadeIn = 1048576,  Random = 2097152,  LastMod = 4194304,  Key9 = 16777216,  Key10 = 33554432,  Key1 = 67108864,  Key3 = 134217728,  Key2 = 268435456,  SCOREV2 = 536870912, r = [], hasNightcore = false, hasPF = false;

            if (m & NoFail) {
                r.push('NF');
            }
            if (m & Easy) {
                r.push('EZ');
            }
            if (m & NoVideo) {
                r.push('TD');
            }
            if (m & Hidden) {
                r.push('HD');
            }
            if (m & Nightcore) {
                r.push('NC');
                hasNightcore = true;
            }
            if (!hasNightcore && (m & DoubleTime)) {
                r.push('DT');
            }
            if (m & HardRock) {
                r.push('HR');
            }
            if (m & Perfect) {
                r.push('PF');
                hasPF = true;
            }
            if (m & Relax) {
                r.push('RX');
            }
            if (m & HalfTime) {
                r.push('HT');
            }
            if (m & Flashlight) {
                r.push('FL');
            }
            if (m & Autoplay) {
                r.push('AP');
            }
            if (m & SpunOut) {
                r.push('SO');
            }
            if (m & Relax2) {
                r.push('AP');
            }
            if (!hasPF && (m & SuddenDeath)) {
                r.push('SD');
            }
            if (m & Key4) {
                r.push('4K');
            }
            if (m & Key5) {
                r.push('5K');
            }
            if (m & Key6) {
                r.push('6K');
            }
            if (m & Key7) {
                r.push('7K');
            }
            if (m & Key8) {
                r.push('8K');
            }
            if (m & keyMod) {
                r.push('');
            }
            if (m & FadeIn) {
                r.push('FD');
            }
            if (m & Random) {
                r.push('RD');
            }
            if (m & LastMod) {
                r.push('CN');
            }
            if (m & Key9) {
                r.push('9K');
            }
            if (m & Key10) {
                r.push('10K');
            }
            if (m & Key1) {
                r.push('1K');
            }
            if (m & Key3) {
                r.push('3K');
            }
            if (m & Key2) {
                r.push('2K');
            }
            if (m & SCOREV2) {
                r.push('V2');
            }
            if (r.length > 0) {
                if (!plus) return r
                return "+ "+r;

            } else {
                return ['NM'];
            }
        },
        convertModsToFull(mods) {
            var result;
            switch(mods){
                default:
                case 'HD':
                    result = "Hidden"
                    break;
                case 'NF':
                    result = "No Fail"
                    break;
                case 'DT':
                    result = "Double Time"
                    break;
                case 'NC':
                    result = "Night Core"
                    break;
                case 'EZ':
                    result = "Easy"
                    break;
                case 'HR':
                    result = "Hard Rock"
                    break;
                case 'PF':
                    result = "Perfect"
                    break;
                case 'RX':
                    result = "Relax"
                    break;
                case 'HT':
                    result = "Half Time"
                    break;
                case 'FL':
                    result = "Flashlight"
                    break;
                case 'AUTO':
                    result = "Autoplay"
                    break;
                case 'SO':
                    result = "Spun Out"
                    break;
                case 'AP':
                    result = "AutoPliot"
                    break;
                case 'SD':
                    result = "Sudden Death"
                    break;
                case 'K4':
                    result = "4 Keys"
                    break;
                case 'K5':
                    result = "5 Keys"
                    break;
                case 'K6':
                    result = "6 Keys"
                    break;
                case 'K7':
                    result = "7 Keys"
                    break;
                case 'K8':
                    result = "8 Keys"
                    break;
                case 'K9':
                    result = "9 Keys"
                    break;
                case 'K10':
                    result = "10 Keys"
                    break;
                case 'K1':
                    result = "1 Keys"
                    break;
                case 'K2':
                    result = "2 Keys"
                    break;
                case 'K3':
                    result = "3 Keys"
                    break;
                case 'V2':
                    result = "Score V2"
                    break;
                case 'RANDOM':
                    result = "Random"
                    break;
                case 'FD':
                    result = "Fade In"
                    break;
                case 'NM':
                    result = "No Mod"
                    break;
            }
            return result; 
        },
        TagSlice(tags) {
            var vm = this;
            var SliceTag = tags.split(' ');
            vm.Tags = SliceTag;
        },
        getTopScore() {
            var vm = this;
            if (vm.data.Scores != null) {
                var score = vm.data.Scores[0];
                vm.TopScore = score;
            } else {
                vm.TopScore = [{
                    "scoreid": "0",
                    "userid": "0",
                    "username": "",
                    "country": "",
                    "score": "0",
                    "rank": "0",
                    "max_combo": "",
                    "mods": "",
                    "count300": "",
                    "count100": "",
                    "count50": "",
                    "countmiss": "",
                    "time": "",
                    "play_mode": "",
                    "accuracy": "",
                    "pp": "",
                    "fc": ""
                }];
            }
        },
        getSubData(bid) {
            var vm = this;
            for (const bmap in vm.data.Beatmaps) {
                var bmp = vm.data.Beatmaps[bmap];
                if (bmp.beatmap_id === bid) {
                    vm.beatmapinfo.Diffname = bmp.Diffname;
                    vm.beatmapinfo.Difficulty = bmp.Difficulty;
                    vm.beatmapinfo.TotalLength = bmp.TotalLength;
                    vm.beatmapinfo.BPM = bmp.BPM;
                    vm.beatmapinfo.CircleCount = bmp.CircleCount;
                    vm.beatmapinfo.SliderCount = bmp.SliderCount;
                    vm.beatmapinfo.AR = bmp.AR;
                    vm.beatmapinfo.OD = bmp.OD;
                    vm.beatmapinfo.HP = bmp.HP;
                    vm.beatmapinfo.CS = bmp.CS;
                    vm.beatmapinfo.Difficulty = bmp.Difficulty;
                }
            }
        },
        Diffmouseleave(b) {
            var vm = this;
            if (!vm.load) {
                vm.hoverbid = b.beatmap_id;
            }
        },
        DiffChange(id) {
            var vm = this;
            if (!vm.load) {
                vm.bid = id;
                vm.hoverbid = id;
            }
        },
        clearCountBeatmap() {
            var vm = this;
            vm.beatmapcount.std = 0;
            vm.beatmapcount.taiko = 0;
            vm.beatmapcount.ctb = 0;
            vm.beatmapcount.mania = 0;
        },
        countingBeatmap() {
            var vm = this;
            vm.clearCountBeatmap();
            for (const bmap in vm.data.Beatmaps) {
                var bmp = vm.data.Beatmaps[bmap];
                switch (bmp.Mode) {
                    case 0:
                        vm.beatmapcount.std += 1;
                        break
                    case 1:
                        vm.beatmapcount.taiko += 1;
                        break
                    case 2:
                        vm.beatmapcount.ctb += 1;
                        break
                    case 3:
                        vm.beatmapcount.mania += 1;
                        break
                    default:
                        vm.beatmapcount.std += 1;
                        break
                }
            }
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
        secondsToTime2(time){
            
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = ~~time % 60;
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + (secs < 10 ? "0" : "");
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
        calcSuccessRate(pass, play) {
            var result = (pass / play) * 100
            if (isNaN(result)){
                return 0;
            }
            result = parseFloat(result.toFixed(2));
            return result
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
            return "about " + Math.floor(seconds) + " seconds ago";
        },
        achievedtimeSince: function(date) {
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
                return "a year ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) { 
                return interval + " months ago";
            }if (interval === 1){
                return "a month ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days ago";
            }if (interval === 1){
                 interval = Math.floor(seconds / 3600);
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours ago";
            }if (interval === 1){
                return "a hour ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes ago";
            }if (interval === 1){
                return "a minute ago";
            }
            return Math.floor(seconds) + " seconds ago";
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
    justify-content: center;
    flex-wrap: wrap;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #777;
    transition: color 200ms ease-in-out;
}

div.beatmap-header-mods > div.beatmap-mods > a.beatmap-mods-a:hover{
    color: rgba(255, 255, 255, 0.801);
}

div.beatmap-header-mods > div.beatmap-mods > a.beatmap-mods-a.active {
    color: white;
}

div.beatmap-header-mods > div.beatmap-mods > a.beatmap-mods-a > div {
    padding: 2.5px 5px;
    background: #151429;
    margin-left: 2px;
    border-radius: 6px;
    color: #ffffffa1;
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
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
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
    flex-wrap: wrap;
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
    flex: 0.35;
    justify-content: center;
}

.version-info-line-last {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ca8811;
    font-weight: bold;
    flex: 0.35;
    justify-content: center;
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
    min-width: 310px;
}

div.beatmap-diff-block {
    display: inline-block;
    flex-direction: column;
    position: absolute;
    color: white;
    margin: 20px;
    padding: 0;
    z-index: 3;
}

div.beatmap-diffs {
    display: inline-flex;
    background: #4444449e;
    border-radius: 15px;
    flex-wrap: wrap;
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
    background: #8c8b8ba1;
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
    z-index: 2;
}

div.beatmap-main {
    display: flex;
    flex-direction: row;
}

div.beatmap-info {
    display: flex;
    flex: 0 2 0;
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

div.beatmap-description {
    display: flex;
    flex: 0.8 1 0;
    padding: 1.5em .75em;
    border-left: #b3b3b3 1px solid;
    border-right: #b3b3b3 1px solid;
    justify-content: flex-start;
    flex-wrap: wrap;
}

div.beatmap-description-single {
    display: flex;
    flex-direction: column;
    padding: 2px 10px;
}

div.beatmap-description-single-title {
    font-weight: bold;
    font-size: 16px;
}

div.beatmap-description-single-description {
    font-size: 13px;
    color: #4d3dd2;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

div.beatmap-description-single-description > span:not(:last-child) {
    padding: 1px 8px 1px 0;
}

div.beatmap-description > div.bbcode > a {
    color: #1000ff;
    text-decoration-line: inherit;
    text-decoration: #000;
}

div.beatmap-stats {
    flex: 1 1 0;
    padding: 1.5em;
    background: #dedede;
    border-radius: 0 0 6px;
}

div.beatmap-stats > div:not(:last-child) {
    margin-bottom: 10px;
}

div.beatmap-stats-single-header {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 5px;
}

div.beatmap-users-block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 7px;
}

a.beatmap-user-block {
    font-weight: 500;
    color: #494949;
    display: flex;
    min-width: 0;
    margin-bottom: 12px;
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
    margin: 0 5px 0 0;
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

div.beatmap-success-failed-text {
    display: flex;
    justify-content: space-between;
    padding: 5px 2px;
    font-weight: bold;
}

span.beatmap-success-failed-passcount {
    color: #54ab04;
}

span.beatmap-success-failed-avg {
    color: #808080;
}

span.beatmap-success-failed-playcount {
    color: #f88;
}



div.scoreboard {
    display: flex;
    width: 100%;
    overflow-x: auto;
    flex-direction: column;
}

div.scoreboard > div.scoreboard-mods {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    /* border-bottom: 1px solid #777; */
}

div.scoreboard > div.scoreboard-mods > div.scoreboard-mods-selector {
    padding: 0.75em 1em;
    cursor: pointer;
    position: relative;
    border-bottom: 2px #c72662 solid;
    display: flex;
    justify-content: baseline;
    font-weight: bold;
    transition: ease-in-out 125ms all;
    color: #000;
}

div.scoreboard > div.scoreboard-mods > div.scoreboard-mods-selector:hover {
    color: #c72662;
    border-bottom: 4px #c72662 solid;
}

div.scoreboard > div.scoreboard-mods > div.scoreboard-mods-selector:first-child {
    margin-right: 10px;
}

div.scoreboard > div.scoreboard-mods > div.scoreboard-mods-selector.active {
    border-bottom: 5px #c72662 solid;
    color: #c72662;
}

div.scoreboard-topplay {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 25px;
}

div.scoreboard-topplay-left-block, div.scoreboard-topplay-right-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
}

/* Top Play left block */
div.scoreboard-topplay-rank {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scoreboard-topplay-rank-number {
    font-size: 1.5em;
    font-style: oblique;
}

.score-rank {
    width: 3.5em;
    height: 1.5em;
}

div.scoreboard-topplay-avatar {
    border: 2px solid #777;
    border-radius: 7px;
    margin-right: 10px;
}

div.scoreboard-toppplay-user-information {
    display: flex;
    flex-direction: column;
}

a.scoreboard-topplay-user-username {
    color: black;
    font-weight: bold;
    font-size: 18px;
}

/* Top Play Right block */
div.scoreboard-toppplay-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

div.scoreboard-toppplay-stat:not(:last-child) {
    margin-right: 1.15em;
}

div.short-margin {
    margin-right: 0.15em !important;
}

div.scoreboard-toppplay-stat.header {
    font-size: 10px;
    font-weight: 700;
    color: #666c80;
    padding-bottom: 2px;
    border-bottom: 2px solid #989898;
    text-transform: uppercase;
    min-width: 50px;
    white-space: nowrap;
}

div.scoreboard-toppplay-stat-body {
    display: flex;
}

/* Scoreboard */
div.scoreboard-scores-table-block {
    margin-bottom: 10px;
    overflow-x: auto;
    padding: 10px;
}

table.scoreboard-scores-table {
    width: 100%;
    min-width: 800px;
    font-size: 12px;
    background-color: transparent;
}

table.scoreboard-scores-table > thead > tr > th {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 5px;
}

th.scoreboard-score-hedaer-rank {
    width: 40px;
    text-align: right; 
}

th.scoreboard-score-hedaer-accuracy, th.scoreboard-score-hedaer-grade, th.scoreboard-score-hedaer-score {
    width: 70px;
}

th.scoreboard-score-hedaer-flag {
    width: 25px;
}

th.scoreboard-score-hedaer-player {
    width: 180px;
}

th.scoreboard-score-hedaer-maxcombo {
    width: 100px;
}

th.scoreboard-score-hedaer-hitstat {
    max-width: 55px;
    min-width: 30px;
    white-space: nowrap;
    padding-right: 5px;
}

th.scoreboard-score-hedaer-miss, th.scoreboard-score-hedaer-pp {
    width: 50px;
}

th.scoreboard-score-hedaer-mods {
    min-width: 50px;
    padding-left: 5px;
    display: flex;
}

tr.scoreboard-scores-table-body-row:nth-child(odd) {
    background-color: rgb(167 167 167 / 25%);
}

td.scoreboard-scores-table-cell:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

td.scoreboard-scores-table-cell > a {
    color: black;
    text-decoration: none;
    display: flex;
    height: 0.95em;
    padding: 5px 0;
    align-items: center;
    justify-content: center;
}

a.scoreboard-scores-table-cell-content-rank {
    font-weight: 700;
    justify-content: flex-end;
}

a.scoreboard-scores-table-cell-content-grade {
    justify-content: center;
}

a.scoreboard-scores-table-cell-content-flag {
    box-shadow: none;
}

a.scoreboard-scores-table-cell-content-perfect {
    color: #b3ff66;
}

a.scoreboard-scores-table-cell-content-time {
    white-space: nowrap;
}

a.scoreboard-scores-table-cell-content-mods {
    padding-left: 5px;
    padding-right: 10px;
    justify-content: flex-start !important;
}

div.scoreboard-scores-table-mods {
    display: flex;
    --mod-height: 18px;
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

.odometer-inside {
    display: flex;
}

@media screen and (max-width: 350px) {
    div.beatmap-header-mods > div.beatmap-mods { margin-right: 10px }
    div.version-basic-info { padding: 0; }
    div.version-info { min-width: 250px !important; }
}

@media screen and (max-width: 767px) {
    div.beatmap-header { flex-direction: column; }
    div.beatmap-information > div.beatmap-header > div.beatmap-header-info { margin: 0 auto; }
    div.beatmap-information > div.beatmap-header > div.beatmap-header-mods { margin-left: 0; margin: 0 auto; }
    div.beatmap-header-mods > div.beatmap-mods:last-child { margin-right: 0; }
    div.beatmap-main { flex-direction: column; }
    div.beatmap-description { border-left: none; border-right: none; border-top: #b3b3b3 1px solid; border-bottom: #b3b3b3 1px solid; }
    div.version-info { min-width: 330px; }
}

@media screen and (min-width: 768px) and (max-width: 990px) {
    div.version-info { min-width: 190px; }
}

@media screen and (min-width: 768px) and (max-width: 1279px) {
}

@media screen and (min-width: 1280px) {
    
}

:root{--hsl-p:var(--base-hue),100%,50%;--hsl-h1:var(--base-hue),100%,70%;--hsl-h2:var(--base-hue),50%,45%;--hsl-c1:var(--base-hue),40%,100%;--hsl-c2:var(--base-hue),40%,90%;--hsl-l1:var(--base-hue),40%,80%;--hsl-l2:var(--base-hue),40%,75%;--hsl-l3:var(--base-hue),40%,70%;--hsl-l4:var(--base-hue),40%,50%;--hsl-d1:var(--base-hue),20%,35%;--hsl-d2:var(--base-hue),20%,30%;--hsl-d3:var(--base-hue),20%,25%;--hsl-d4:var(--base-hue),20%,20%;--hsl-d5:var(--base-hue),20%,15%;--hsl-d6:var(--base-hue),20%,10%;--hsl-f1:var(--base-hue),10%,60%;--hsl-b1:var(--base-hue),10%,40%;--hsl-b2:var(--base-hue),10%,30%;--hsl-b3:var(--base-hue),10%,25%;--hsl-b4:var(--base-hue),10%,20%;--hsl-b5:var(--base-hue),10%,15%;--hsl-b6:var(--base-hue),10%,10%;--colour-pink-hue:333;--hsl-pink-1:var(--colour-pink-hue),100%,70%;--hsl-pink-2:var(--colour-pink-hue),80%,60%;--hsl-pink-3:var(--colour-pink-hue),60%,50%;--colour-purple-hue:255;--hsl-purple-1:var(--colour-purple-hue),100%,70%;--hsl-purple-2:var(--colour-purple-hue),80%,60%;--hsl-purple-3:var(--colour-purple-hue),60%,50%;--colour-blue-hue:200;--hsl-blue-1:var(--colour-blue-hue),100%,70%;--hsl-blue-2:var(--colour-blue-hue),80%,60%;--hsl-blue-3:var(--colour-blue-hue),60%,50%;--colour-green-hue:125;--hsl-green-1:var(--colour-green-hue),100%,70%;--hsl-green-2:var(--colour-green-hue),80%,60%;--hsl-green-3:var(--colour-green-hue),60%,50%;--colour-lime-hue:90;--hsl-lime-1:var(--colour-lime-hue),100%,70%;--hsl-lime-2:var(--colour-lime-hue),80%,60%;--hsl-lime-3:var(--colour-lime-hue),60%,50%;--colour-orange-hue:45;--hsl-orange-1:var(--colour-orange-hue),100%,70%;--hsl-orange-2:var(--colour-orange-hue),80%,60%;--hsl-orange-3:var(--colour-orange-hue),60%,50%;--colour-red-hue:360;--hsl-red-1:var(--colour-red-hue),100%,70%;--hsl-red-2:var(--colour-red-hue),80%,60%;--hsl-red-3:var(--colour-red-hue),60%,50%;--colour-darkorange-hue:20;--hsl-darkorange-1:var(--colour-darkorange-hue),100%,70%;--hsl-darkorange-2:var(--colour-darkorange-hue),80%,60%;--hsl-darkorange-3:var(--colour-darkorange-hue),60%,50%}
.proportional-container{max-width:100%;display:inline-block;vertical-align:top}
.proportional-container__height{display:block;position:relative}
.proportional-container__content{position:absolute;height:100%;width:100%;top:0;left:0}
.bbcode{font-family:var(--font-content-override,var(--font-content));line-height:1.35;word-wrap:break-word;line-height:1.5}
.bbcode h2,.bbcode h4{font-style:normal;font-weight:700}
.bbcode h2{font-size:1.5em;color:hsl(var(--hsl-l1))}
.bbcode blockquote{font-size:inherit;padding:0 0 0 20px;border:none;color:hsl(var(--hsl-c2));position:relative}
.bbcode blockquote:before{content:"";position:absolute;left:0;top:0;width:2px;height:100%;border-radius:10000px;background-color:hsl(var(--hsl-c2))}
.bbcode blockquote h4{font-size:inherit;color:hsl(var(--hsl-c1));margin:0 0 10px}
.bbcode blockquote blockquote{font-size:.9em}
.bbcode blockquote blockquote:before{display:none}
.bbcode blockquote blockquote h4{color:inherit}
.bbcode blockquote blockquote blockquote blockquote blockquote{padding-left:0;font-size:1em}
.bbcode img{max-width:100%}.bbcode ol,.bbcode ul{padding-left:20px}
.bbcode ol ol,.bbcode ul ol{font-size:.85em}
.bbcode ol ol ol,.bbcode ul ol ol{font-size:1em}
.bbcode pre{border-radius:4px;white-space:pre-wrap;background-color:hsl(var(--hsl-b5));color:inherit;padding:10px;border:none;font-size:inherit}
.bbcode .unordered{list-style-type:disc}
.bbcode .spoiler{background-color:#000!important;color:#000!important}
.bbcode .size-50{font-size:50%}
.bbcode .size-85{font-size:85%}
.bbcode .size-150{font-size:150%}
.bbcode .well{margin:0;background:hsl(var(--hsl-b5));border:2px solid hsl(var(--hsl-b1))}
.bbcode--normal-line-height{line-height:inherit}
.bbcode__list-title{list-style:none;margin:0}
.bbcode__video-box{max-width:425px}
.bbcode__video{position:relative;padding-bottom:75%}
.bbcode__video iframe{position:absolute;left:0;right:0;width:100%;height:100%}
</style>

<template>
<div>
    <section>
        <!-- test | bid: {{ bid }} mode: {{ mode }} relax: {{ relax }} page: {{ page }} -->
        <div class="beatmap-information">
            <div class="beatmap-header">
                <div class="beatmap-header-info">
                    <div class="beatmap-header-icon"></div>
                    <span>Beatmap Information</span>
                </div>
                <div class="beatmap-header-mods">
                    <div class="beatmap-mods">
                        <a :class="'beatmap-mods-a ' + (mode == 0 ? 'active' : '')" v-on:click="mode=0">osu!
                            <div v-show=" beatmapcount.std != 0">
                                {{ beatmapcount.std }}
                            </div>
                        </a>
                    </div>
                    <div class="beatmap-mods">
                        <a :class="'beatmap-mods-a ' + (mode == 1 ? 'active' : '')" v-on:click="mode=1">osu!taiko
                            <div v-show=" beatmapcount.taiko != 0">
                                {{ beatmapcount.taiko }}
                            </div>
                        </a>
                    </div>
                    <div class="beatmap-mods">
                        <a :class="'beatmap-mods-a ' + (mode == 2 ? 'active' : '')" v-on:click="mode=2">osu!catch
                            <div v-show=" beatmapcount.ctb != 0">
                                {{ beatmapcount.ctb }}
                            </div>
                        </a>
                    </div>
                    <div class="beatmap-mods">
                        <a :class="'beatmap-mods-a ' + (mode == 3 ? 'active' : '')" v-on:click="mode=3">osu!mania
                            <div v-show=" beatmapcount.mania != 0">
                                {{ beatmapcount.mania }}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="beatmap-thumb" :style="'background-image: url(https://assets.ppy.sh/beatmaps/' + data.Beatmap.beatmapset_id + '/covers/cover@2x.jpg), url(data:image/png;base64,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)'">
                <div class="beatmap-diff-block">
                    <div class="beatmap-diffs">
                        <div v-for="(bmp, index) in data.Beatmaps" v-bind:key="index.id" :class="bid == bmp.beatmap_id ? 'beatmap-diff-now' : 'beatmap-diff'" v-on:mouseover="hoverbid = bmp.beatmap_id" v-on:mouseleave="Diffmouseleave(data.Beatmap)">
                            <a v-on:click="DiffChange(bmp.beatmap_id)" :class="bid == bmp.beatmap_id ? 'beatmap-diff-icon faa fa-extra-mode-' + convertModeToico(bmp.mode) + ' ' + convertDiffToClass(bmp.Difficulty) : 'beatmap-diff-icon faa fa-extra-mode-' + convertModeToico(bmp.mode) + ' ' + convertDiffToClass(bmp.Difficulty)"></a>
                        </div>
                    </div>
                    <div class="beatmap-map-info">
                        <div v-if="load">
                            <div class="beatmap-diff-name">
                                <span class="beatmap-diff-name" id="beatmap-diff">{{ beatmapinfo.Diffname }}</span>
                                <span class="beatmap-diff-star" id="beatmap-star">
                                    <i class="fas fa-star"></i> {{ beatmapinfo.Difficulty.toFixed(2) }}
                                </span>
                            </div>
                            <div class="beatmap-map-name">
                                <span class="beatmap-map-name-title">{{ data.Beatmap.title }}</span>
                                <span class="beatmap-map-name-artist">{{ data.Beatmap.artist }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="beatmap-diff-name">
                                <span class="beatmap-diff-name" id="beatmap-diff">{{ beatmapinfo.Diffname }}</span>
                                <span class="beatmap-diff-star" id="beatmap-star">
                                    <i class="fas fa-star"></i> {{ beatmapinfo.Difficulty.toFixed(2) }}
                                </span>
                            </div>
                            <div class="beatmap-map-name">
                                <span class="beatmap-map-name-title">{{ data.Beatmap.title }}</span>
                                <span class="beatmap-map-name-artist">{{ data.Beatmap.artist }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="beatmap-ranked-status" v-if="load">
                    <span><i class="fad fa-spinner spin"></i> Loading...</span>
                </div>
                <div class="beatmap-ranked-status" v-else>
                    {{ convertRankedStatusToText(data.Beatmap.Ranked) }}
                </div>
            </div>
            <div class="beatmap-main">  
                <div class="beatmap-info">
                    <div class="version-hoverlist-single">
                        <div class="version-info">
                            <div class="version-basic-info">
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Total Length: {{ secondsToTime(beatmapinfo.TotalLength) }}
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico length"></div>
                                        <vue-odometer :value="secondsToTime2(beatmapinfo.TotalLength)" duration="200" format="(:dd),dd"></vue-odometer>
                                        <!-- {{ secondsToTime(beatmapinfo.TotalLength) }} -->
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        BPM: {{ beatmapinfo.BPM }}
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico bpm"></div>
                                        <vue-odometer :value="beatmapinfo.BPM" duration="200"></vue-odometer>
                                        <!-- {{ beatmapinfo.BPM }} -->
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Circle Count: {{ addCommas(beatmapinfo.CircleCount) }}
                                    </div>
                                    <div class="version-info-line">
                                        <div class="version-ico circlecount"></div>
                                        <vue-odometer :value="addCommas(beatmapinfo.CircleCount)" duration="200" format="(.ddd),dd"></vue-odometer>
                                        <!-- {{ addCommas(beatmapinfo.CircleCount) }} -->
                                    </div>
                                </el-tooltip>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content" class="beatmap-tooltip">
                                        Slider Count: {{ addCommas(beatmapinfo.SliderCount) }}
                                    </div>
                                    <div class="version-info-line-last">
                                        <div class="version-ico slidercount"></div>
                                        <vue-odometer :value="addCommas(beatmapinfo.SliderCount)" duration="200" format="(.ddd),dd"></vue-odometer>
                                        <!-- {{ addCommas(beatmapinfo.SliderCount) }} -->
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="version-more-info">
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Circle Size</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(beatmapinfo.CS)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">HP Drain</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(beatmapinfo.HP)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Accuracy</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(beatmapinfo.OD)"></el-progress>
                                </div>
                                <div class="version-more-info-line">
                                    <span class="version-more-info-text">Approach Rate</span>
                                    <el-progress :text-inside="true" :format="percentFormat" stroke-width="16" :percentage="convertPercent(beatmapinfo.AR)"></el-progress>
                                </div>
                                <div class="version-more-info-line-last">
                                    <span class="version-more-info-text">Star Difficulty</span>
                                    <el-progress :text-inside="true" :format="percentFormat" :color="diffColor" stroke-width="16" :percentage="convertPercent(parseFloat(beatmapinfo.Difficulty.toFixed(2)))"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="beatmap-description">
                    <div class="beatmap-description-single">
                        <div class="beatmap-description-single-title">
                            <span>Genre</span>
                        </div>
                        <div class="beatmap-description-single-description">
                            <span>{{ BeatmapMirrorData.genre.name }}</span>
                        </div>
                    </div>
                    <div class="beatmap-description-single">
                        <div class="beatmap-description-single-title">
                            <span>Language</span>
                        </div>
                        <div class="beatmap-description-single-description">
                            <span>{{ BeatmapMirrorData.language.name }}</span>
                        </div>
                    </div>
                    <div class="beatmap-description-single">
                        <div class="beatmap-description-single-title">
                            <span>Tags</span>
                        </div>
                        <div class="beatmap-description-single-description">
                            <span v-for="(tag, index) in Tags" v-bind:key="index.id">{{ tag }}</span>
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
                    <div class="beatmap-success-failed">
                        <div class="beatmap-stats-single-header">
                            <span>Success Rate</span>
                        </div>
                        <el-progress :show-text=false :percentage="calcSuccessRate(data.Beatmap.Passcount, data.Beatmap.Playcount)"></el-progress>
                        <div class="beatmap-success-failed-text">
                            <span class="beatmap-success-failed-passcount">{{ data.Beatmap.Passcount }}</span>
                            <span class="beatmap-success-failed-avg">{{ calcSuccessRate(data.Beatmap.Passcount, data.Beatmap.Playcount) }}%</span>
                            <span class="beatmap-success-failed-playcount">{{ data.Beatmap.Playcount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="scoreboard">
            <div class="scoreboard-mods">
                <div :class="'scoreboard-mods-selector ' + (relax == 0 ? 'active' : '')" v-on:click="relax = 0">Regular</div>
                <div :class="'scoreboard-mods-selector ' + (relax == 1 ? 'active' : '')" v-on:click="relax = 1">Relax</div>
            </div>
            <div class="scoreboard-topplay" v-if="TopScore.score >= 1" v-show="TopScore.score >= 1">
                <div class="scoreboard-topplay-left-block">
                    <div class="scoreboard-topplay-rank">
                        <div class="scoreboard-topplay-rank-number">
                            #1
                        </div>
                        <div :class="'score-rank score-rank--tiny score-rank--' + TopScore.rank"></div>
                    </div>
                    <div class="scoreboard-topplay-avatar">
                        <a :href="'https://debian.moe/' + (relax == 0 ? 'u/' : 'rx/u/') + TopScore.userid" class="avatar userprofile" :style="'background-image: url(https://a.debian.moe/' + TopScore.userid + ')'"></a>
                    </div>
                    <div class="scoreboard-toppplay-user-information">
                        <a :href="'https://debian.moe/' + (relax == 0 ? 'u/' : 'rx/u/') + TopScore.userid" class="scoreboard-topplay-user-username">{{ TopScore.username }}</a>
                        <div class="scoreboard-topplay-user-achieved">
                            achieved {{achievedtimeSince(Number(TopScore.time))}}
                        </div>
                        <div class="flag-country flag-country--flat" :style="'background-image: url(/img/flags/' + TopScore.country + '.png'"></div>
                    </div>
                </div>
                <div class="scoreboard-topplay-right-block">
                    <div class="scoreboard-toppplay-stats">
                        <div class="scoreboard-toppplay-stat">
                            <div class="scoreboard-toppplay-stat header">SCORE</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.score)}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat">
                            <div class="scoreboard-toppplay-stat header">PP</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(parseFloat(Number(TopScore.pp).toFixed(0)))}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat">
                            <div class="scoreboard-toppplay-stat header">MODS</div>
                            <div class="scoreboard-toppplay-stat-body">
                                <el-tooltip v-for="(i, index) in getScoreMods(TopScore.mods, false)" v-bind:key="index.key" class="item" effect="dark" :content="convertModsToFull(i)" placement="top">
                                    <div :class="'mod mod--' + i"></div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="scoreboard-toppplay-stat">
                            <div class="scoreboard-toppplay-stat header">ACCURACY</div>
                            <div class="scoreboard-toppplay-stat-body">{{parseFloat(Number(TopScore.accuracy).toFixed(0))}}%</div>
                        </div>
                        <div class="scoreboard-toppplay-stat">
                            <div class="scoreboard-toppplay-stat header">MAX COMBO</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.max_combo)}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat short-margin">
                            <div class="scoreboard-toppplay-stat header">300</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.count300)}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat short-margin">
                            <div class="scoreboard-toppplay-stat header">100</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.count100)}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat short-margin">
                            <div class="scoreboard-toppplay-stat header">50</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.count50)}}</div>
                        </div>
                        <div class="scoreboard-toppplay-stat short-margin">
                            <div class="scoreboard-toppplay-stat header">MISS</div>
                            <div class="scoreboard-toppplay-stat-body">{{addCommas(TopScore.countmiss)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scoreboard-scores-table-block">
                <table class="scoreboard-scores-table">
                    <thead>
                        <tr>
                            <th class="scoreboard-score-hedaer-rank">Rank</th>
                            <th class="scoreboard-score-hedaer-grade"></th>
                            <th class="scoreboard-score-hedaer-accuracy">Accuracy</th>
                            <th class="scoreboard-score-hedaer-flag"></th>
                            <th class="scoreboard-score-hedaer-player">Player</th>
                            <th class="scoreboard-score-hedaer-maxcombo">Max Combo</th>
                            <th class="scoreboard-score-hedaer-hitstat">300</th>
                            <th class="scoreboard-score-hedaer-hitstat">100</th>
                            <th class="scoreboard-score-hedaer-hitstat">50</th>
                            <th class="scoreboard-score-hedaer-hitstat">Miss</th>
                            <th class="scoreboard-score-hedaer-pp">pp</th>
                            <th class="scoreboard-score-hedaer-score">Score</th>
                            <th class="scoreboard-score-hedaer-time">Time</th>
                            <th class="scoreboard-score-hedaer-mods">Mods</th>
                        </tr>
                    </thead>
                    <tbody class="scoreboard-scores-table-body">
                        <tr class="scoreboard-scores-table-body-row" v-for="(score, index) in data.Scores" v-bind:key="index.id">
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-rank">{{ index + 1 }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-grade">
                                    <div :class="'score-rank score-rank--more-tiny score-rank--' + score.rank"></div>
                                </a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-accuracy">{{ parseFloat(Number(score.accuracy).toFixed()) }}%</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-flag">
                                    <div class="flag-country flag-country--flat" :style="'background-image: url(/img/flags/' + score.country + '.png'"></div>
                                </a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ score.username }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-perfect">{{ addCommas(score.max_combo) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ addCommas(score.count300) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ addCommas(score.count100) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ addCommas(score.count50) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ addCommas(score.countmiss) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">
                                    <span>{{ parseFloat(Number(score.pp).toFixed()) }}</span>
                                </a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content">{{ addCommas(score.score) }}</a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-time">
                                    <span>{{ timeSince(score.time) }}</span>
                                </a>
                            </td>
                            <td class="scoreboard-scores-table-cell">
                                <a :href="'https://debian.moe/u/' + score.userid" class="scoreboard-scores-table-cell-content-mods">
                                    <div class="scoreboard-scores-table-mods">
                                        <el-tooltip v-for="(i, index) in getScoreMods(score.mods, false)" v-bind:key="index.key" class="item" effect="dark" :content="convertModsToFull(i)" placement="top">
                                            <div :class="'mod mod--' + i"></div>
                                        </el-tooltip>                                        
                                    </div>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</div>
</template>