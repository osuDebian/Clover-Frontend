<script>
export default {
    name: 'newest',
    props: ['beatmap'],
    methods: {
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
        unixToTime(t){
            var date = new Date(t*1000);
            var year = date.getFullYear();
            var month = "0" + (date.getMonth()+1);
            var day = "0" + date.getDate();
            var hour = "0" + date.getHours();
            var minute = "0" + date.getMinutes();
            var second = "0" + date.getSeconds();
            return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2) + " (UTC+9)";
        }
    }
}
</script>

<template>
    <a :href="'/beatmaps/' + beatmap.beatmap_id" class="beatmap-block">
        <div class="beatmap-preview" v-bind:style="{ backgroundImage: 'url(https://b.ppy.sh/thumb/' + beatmap.beatmapset_id + 'l.jpg), url(images/beatmapscover.png)' }"></div>
        <div class="beatmap-info">
            <span class="title">{{beatmap.title}}</span>
            <span class="artist">{{beatmap.artist}}</span>
            <div class="beatmap-footer">
                <span class="mapper">mapped by <b>{{beatmap.creator}}</b></span>
                <div class="beatmap-worked">
                    <span>{{timeSince(beatmap.latest_update)}}</span>
                    <div class="go-button">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>
