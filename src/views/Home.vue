<script>
import mostBeatmap from './beatmaps/most';
import newestBeatmap from './beatmaps/newest';
export default {
    name: 'Home',
    components: {
        'mostBeatmap': mostBeatmap,
        'newestBeatmap': newestBeatmap
    },
    data(){
        return {
			serverinfoData: null,
			mostPlayedData: null,
			newBeatmapData: null,
            loading: true,
			data: null
        }
    },
	created() {
		this.getDataAll();
	},
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
        },
		getServerInfo() {
			var vm = this;
			return vm.$axios.get("https://api.debian.moe/web/online");
		},
		getMostPlayedBeatmap() {
			var vm = this;
			return vm.$axios.get("https://api.debian.moe/web/today/most");
		},
		getNewestRankedBeatmap() {
			var vm = this;
			return vm.$axios.get("https://api.debian.moe/web/recent/ranked");
		},
		getDataAll() {
			var vm = this;
			vm.loading = true;
			vm.$axios.all([vm.getServerInfo(), vm.getMostPlayedBeatmap(), vm.getNewestRankedBeatmap()])
				.then(vm.$axios.spread((...responses) => {
					vm.serverinfoData = responses[0].data[0];
					vm.mostPlayedData = responses[1].data;
					vm.newBeatmapData = responses[2].data;
					vm.loading = false;
				}));
		}
    }
}
</script>

<style>
	a {
		color: white;
	}

	div.loading {
		width: 100%;
		margin: 0 auto;
		text-align: center;
		padding: 10px 0;
	}

	/* ?Information */
	.main-wrapper > section:nth-of-type(1) {
		display: flex;
		position: relative;
		max-height: 440px;
		flex-direction: row;
		padding: 2em 2em 0 2em;
		background-color: #151423;
		border-radius: 20px;
		color: white;
	}

	div.information {
		flex: 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		font-size: 14.5px;
		margin-left: 15px;
	}

	section:nth-child(1) div.information div.txt p strong:nth-child(1){
		color: #66ff9c;
	}
	section:nth-child(1) div.information div.txt p strong:nth-child(2){
		color: #fdff66;
	}

	section:nth-child(1) div.information div.Name h1 {
		display: block;
		font-size: 42px;
	}

	section:nth-child(1) div.Character {
		background: url('../assets/images/chac.png') center / contain no-repeat;
		position: relative;
		display: flex;
		justify-content: right;
		flex: 1.5;
	}

	section:nth-child(1) div.information div.txt {
		padding: 50px 0;
	}

	section:nth-child(1) div.information div.btns {
		display: flex;
		flex-direction: row;
		margin-bottom: 40px;
	}

	div.btn {
		padding: 12.5px 55px;
		display: inline-flex;
		text-align: center;
		color: white;
		background-image: url('../assets/images/button.svg');
		background-size: 150%;
		transition: background-position 200ms ease-in-out;
		border-radius: 25px;
		margin-right: 10px;
	}

	div.btn:hover {
		background-position-x: -50px;
	}

	div.btn.pink {
		background-color: #f6a;
		box-shadow: 0 4px #86386b, 0 2px 2px #000;
	}

	div.btn.blue {
		background-color: rgb(102, 117, 255);
		box-shadow: 0 4px #393886, 0 2px 2px #000;
	}

	div.btn.green {
		background-color: rgb(75, 190, 114);
		box-shadow: 0 4px #38864b, 0 2px 2px #000;
	}

	/* ? Beatmap */
	section:nth-child(2) div.section-title h2 i {
		color: #946cbf;
	}

	section:nth-child(3) div.section-title h2 i {
		color: #1c901b;
	}

	div.beatmaps {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2em;
		row-gap: 1em;
		position: relative;
		transition: grid-template-columns 300ms ease-in-out;
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
	div.beatmaps .beatmap-block {
		position: relative;
		box-shadow: 0 3px 5px 1 rgb(0 0 0 / 40%);
		transition: 200ms box-shadow;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 8px;
		height: 100px;
		background-color: #121123;
		border-radius: 12px;
		transition: background-color 200ms ease-in-out, transform 150ms ease-in-out;
		z-index: 0;
		text-overflow: ellipsis;
	}

	div.beatmaps .beatmap-block:hover{
		background-color: #0e0e14;
		position: relative;
		transform: scale(1.05);
		z-index: 1233;
	}

	div.beatmaps a.beatmap-block div.beatmap-preview {
		width: 100px;
		height: 100px;
		border-radius: 8px;
		background-position: center;
		background-size: cover;
		margin-right: 10px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	div.beatmaps a.beatmap-block div.beatmap-info .title{
		font-size: 1.1rem;
		font-weight: bold;
	}

	div.beatmaps a.beatmap-block div.beatmap-info .artist{
		font-size: 16px;
		color: #debb58;
	}

	div.beatmaps a.beatmap-block div.beatmap-info .mapper{
		color: #de5894;
	}

	div.beatmaps a.beatmap-block div.beatmap-info div.beatmap-footer{
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-top: 10px;
		font-size: 14px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info div.beatmap-footer .beatmap-worked {
		display: flex;
		align-items: baseline;
	}

	div.go-button {
		margin-left: 5px;
		padding: 2.5px 5px;
		background-color: #303144;
		border-radius: 8px;
	}

	/* ?media Query */
	@media screen and (max-width: 576px) {
		section:nth-child(1) { flex-direction: column; }
	}

	@media screen and (min-width: 578px) {
		section:nth-child(1) { flex-direction: row; }
		div.btns { flex-direction: column !important; }
		div.beatmaps { grid-template-columns: 1fr !important; }
	}

	@media screen and (min-width: 991px) {
		section:nth-child(1) { flex-direction: row; }
		div.btns { flex-direction: row !important; }
		div.beatmaps { grid-template-columns: 1fr 1fr !important; }
	}
</style>

<template>
<div class="main-wrapper">
	<section>
		<div class="information">
			<div class="txt">
				<div class="Name">
					<h1>osu!debian</h1>
				</div>
				<p>Welcome to Debian! Debian is an active South Korean private osu! server operating since May 5th, 2020.</p>
				<p v-if="loading">We currently have <i class="fad fa-spinner spin"></i> registered players and <i class="fad fa-spinner spin"></i> players online right now. </p>
				<p v-else>We currently have <strong>{{addCommas(serverinfoData.registryCounts)}}</strong> registered players and <strong>{{addCommas(serverinfoData.NowOnline)}}</strong> players online right now. </p>
				<p>You can find information on players, beatmap listing, ranking request, access to the server, and anything else related to Debian in this website.</p>
			</div>
			<div class="btns">
				<a href="." class="href">
					<div class="btn pink">
						회원가입
					</div>
				</a>
				<a href="." class="href">
					<div class="btn blue">
						회원가입
					</div>
				</a>
				<a href="." class="href">
					<div class="btn green">
						회원가입
					</div>
				</a>
			</div>
		</div>
		<div class="Character"></div>
	</section>
	
	<section>
		<div class="section-title">
			<h2><i class="fas fa-caret-right"></i> Newest ranked beatmaps</h2>
		</div>
		<div v-if="loading" class="loading" style="color: black;">
			<i class="fad fa-spinner spin"></i>
			<span>Beatmap Loading...</span>
		</div>
		<div v-else class="beatmaps">
			<newestBeatmap v-for="(i, index) in newBeatmapData" v-bind:key="i.id" :beatmap="i" :id="index"></newestBeatmap>
		</div>
	</section>
	
	<section>
		<div class="section-title">
			<h2><i class="fas fa-caret-right"></i> Today's most played beatmaps</h2>
		</div>
		<div v-if="loading" class="loading" style="color: black;">
			<i class="fad fa-spinner spin"></i>
			<span>Beatmap Loading...</span>
		</div>
		<div v-else class="beatmaps">
			<mostBeatmap v-for="(i, index) in mostPlayedData" v-bind:key="i.id" :beatmap="i" :id="index"></mostBeatmap>
		</div>
	</section>	
</div>
</template>
