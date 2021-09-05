<script>
export default {
    name: 'Navbar',
    data(){
        return {
            tab: this.tab,
        }
    },
	watch: {
		tab() {
			console.log(this.tab);
		}
	},
    methods: {
        openNav: function() {
            document.getElementById("sideMenu").style.width = "180px";
        },
        closeNav: function() {
            document.getElementById("sideMenu").style.width = "0";
        }
    }
}
</script>

<style>
	@media (min-width: 576px) {
		nav > .wrap { max-width: 550px; }
	}

	@media (min-width: 768px) {
		nav > .wrap { max-width: 730px; }
	}

	@media (min-width: 992px) {
		nav > .wrap { max-width: 970px; }
	}

	@media (min-width: 1200px) {
		nav > .wrap { max-width: 1240px; }
	}

	nav {
		font-weight: 300;
		padding: 0 1em;
		background-color: rgb(22 18 52 / 70%);
	}

	nav > .wrap { 
		width: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	nav div.wrap div.pc { display: flex; }
	nav div.wrap div.pc > a {
		display: flex;
		align-items: center;
	}
	nav div.wrap div.pc > div {
		position: relative;
		padding: 0;
		display: flex;
		align-items: center;
	}

	nav div.wrap div.pc > div > a,
	nav div.wrap div.mobile > div > div.sidebar > div > a{
		position: relative;
		text-decoration: none;
		font-size: 16px;
		padding: 10px 15px;
		display: block;
		color: white;
		text-align: center;
		transition: all 200ms ease-in-out;
		max-width: 114px;
	}

	nav div.wrap div.mobile > div > div.sidebar > button:first-child:hover { color: #100c30; transition: all 200ms ease-in-out; text-shadow: #f1f1f1 0px 0px 5px;}

	@media (min-width: 0){
		nav div.wrap div.pc { display: none !important; }
		nav div.wrap div.mobile { display: flex !important; }
	}

	@media (min-width: 768px){
		nav div.wrap  div.pc { display: none !important; }
		nav div.wrap  div.mobile { display: flex }
	}

	@media (min-width: 769px){
		nav div.wrap  div.pc { display: flex !important; }
		nav div.wrap  div.mobile { display: none !important; }
	}

	a.logo {
		font-size: 0px;
		padding: 0;
		margin: 0 auto;
		margin: 8px 0;
		margin-right: 8px;
		outline: 0;
		display: flex;
		align-items: center;
	}

	a.logo.mobile {
		width: 100%;
		height: 64px;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	nav a.logo h1 {
		background: url('https://debian.moe/static/debian-trans.png') no-repeat center / 105%;
		width: 44px;
		height: 44px;
		font-size: 0;
		transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	nav div.wrap > div.pc > a.logo:hover h1{ background: url('https://debian.moe/static/debian-trans.png') no-repeat center / 120%; }

	nav div.wrap > div.mobile > div > div.sidebar > a.logo:hover h1{ background: url('https://debian.moe/static/debian-trans.png') no-repeat center / 120%; }

	nav div.wrap > div.mobile > div > div.sidebar div:hover .nav-hover { opacity: 0.5; }

	nav div.wrap > div.mobile > div > div.sidebar .nav-hover:hover { opacity: 1 !important; }
	
	nav div.wrap > div.pc > div:hover .nav-hover { opacity: 0.5; }

	nav div.wrap > div.pc > div:hover .nav-hover:hover { opacity: 1 !important; }

	nav div.wrap > div.pc > div:hover .nav-hover:hover::after {
		position: absolute;
		content: '';
		width: calc(100% - 35px);
		height: 2px;
		background-color: rgb(112 128 196);
		display: block;
		left: 50%;
		top: 32px;
		transform: translateX(-50%) translateY(60%);
		animation: dropdownUnderlineAnim 400ms;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 30px);
		height: 3px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: 5px;
		left: 50%;
		transform: translateX(-50%) translateY(60%);
	}

	button {
		background-color: transparent;
		border: none;
	}

	hr { border: 1px solid rgba(255, 255, 255, 0.35); }

	button.openbtn { cursor: pointer; color: white; transition: all 200ms ease-out;}
	
	button.openbtn:hover{ color: #17152b; text-shadow: 0 0 5px white; }


	.dropbtn {
		font-size: 16px;
		background-color: transparent;
		color: white;
		padding: 10px 15px;
		border: none;
		transition: none;
		cursor: pointer;
	}

	.dropdown {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: none;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #17152b;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		border-radius: 12px;
		z-index: 1;
		transition: none;
		left: 50%;
		top: 100%;
		transform: translateX(-50%);
		padding: 10px 0;
	}

	.dropdown-content a {
		font-size: 14px;
		padding: 8px 4px;
		text-decoration: none;
		display: block;
		color: #a5a5a5;
		text-align: center;
	}

	.dropdown-content a:hover::after {
		position: absolute;
		content: '';
		width: calc(100% - 30px);
		height: 2px;
		background-color: rgb(54 50 94);
		display: block;
		left: 50%;
		transform: translateX(-50%) translateY(60%);
		animation: dropdownUnderlineAnim 400ms;
	}

	@keyframes dropdownUnderlineAnim {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.dropdown:hover .dropdown-content {display: block;}
 
	/* The sidebar menu */
	.sidebar {
		height: 100%; /* 100% Full-height */
		width: 0; /* 0 width - change this with JavaScript */
		position: fixed; /* Stay in place */
		z-index: 112312313; /* Stay on top */
		top: 0;
		left: 0;
		background-color: #100c30; /* Black*/
		overflow-x: hidden; /* Disable horizontal scroll */
		padding-top: 60px; /* Place content 60px from the top */
		transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
		display: flex;
		flex-direction: column;
	}

	.sidebar > div {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}

	/* When you mouse over the navigation links, change their color */
	.sidebar a:hover {
		color: #f1f1f1;
	}

	/* Position and style the close button (top right corner) */
	.sidebar .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 42px;
		margin-left: 50px;
	}

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
		.sidebar {padding-top: 15px;}
		.sidebar a {font-size: 18px;}
	}	

	.sideBtn {
		padding: 12px;
		font-size: 32px;
		vertical-align: middle;
	}

	.closebtn {
		color: white;
		padding: 12px;
		cursor: pointer;
	}
</style>

<template>
    <nav>
        <div class="wrap">
            <div class="pc">
                <a class="logo" href="/">
                    <h1>debian</h1>
                </a>
                <div>
                    <router-link class="nav-hover" to="/leaderboard/vanilla/osu/performance" :aria-current="tab == 'leaderboard' ? 'page' : null">leaderboard</router-link>
                    <router-link class="nav-hover" to="/beatmaps" :aria-current="tab == 'beatmaps' ? 'page' : null">beatmaps</router-link>
                    <div class="nav-hover dropdown">
                        <div class="dropbtn">community</div>
                        <div class="dropdown-content">
                            <router-link to="/clan" :aria-current="tab == 'clan' ? 'page' : null">clan</router-link>
                            <router-link to="/topplay" :aria-current="tab == 'topplay' ? 'page' : null">Top Plays</router-link>
                            <router-link to="/matches" :aria-current="tab == 'matches' ? 'page' : null">matches</router-link>
                        </div>
                    </div>
                    <div class="nav-hover dropdown">
                        <div class="dropbtn" href=".">help</div>
                        <div class="dropdown-content">
                            <router-link to="/about" :aria-current="tab == 'about' ? 'page' : null">about</router-link>
                            <router-link to="/docs" :aria-current="tab == 'docs' ? 'page' : null">docs</router-link>
                            <router-link to="/docs/rule" :aria-current="tab == 'docs/rule' ? 'page' : null">rule</router-link>
                            <router-link to="/terms" :aria-current="tab == 'terms' ? 'page' : null">Terms of service</router-link>
                            <hr>
                            <router-link to="/static/Novah.exe">server switcher</router-link>
                            <a href="https://discord.gg/6VXJ3ky" target="_blank">Discord</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile">
                <div>
                    <div id="sideMenu" class="sidebar">
                        <button class="closebtn" v-on:click="closeNav">&times;</button>
						<a class="logo mobile" href="/">
							<h1>debian</h1>
						</a>
                        <div>
							<router-link class="nav-hover" to="/leaderboard" :aria-current="tab == 'beatmaps' ? 'page' : null">leaderboard</router-link>
							<router-link class="nav-hover" :aria-current="tab == 'beatmaps' ? 'page' : null" to="/beatmaps">beatmaps</router-link>
							<div class="nav-hover dropdown">
								<div class="dropbtn">community</div>
								<div class="dropdown-content">
									<router-link to="/clan" :aria-current="tab == 'clan' ? 'page' : null">clan</router-link>
									<router-link to="/topplay" :aria-current="tab == 'topplay' ? 'page' : null">Top Plays</router-link>
									<router-link to="/matches" :aria-current="tab == 'matches' ? 'page' : null">matches</router-link>
								</div>
							</div>
							<div class="nav-hover dropdown">
								<div class="dropbtn" href=".">help</div>
								<div class="dropdown-content">
									<router-link to="/about" :aria-current="tab == 'about' ? 'page' : null">about</router-link>
									<router-link to="/docs" :aria-current="tab == 'docs' ? 'page' : null">docs</router-link>
									<router-link to="/docs/rule" :aria-current="tab == 'docs/rule' ? 'page' : null">rule</router-link>
									<router-link to="/terms" :aria-current="tab == 'terms' ? 'page' : null">Terms of service</router-link>
									<hr>
									<router-link to="/static/Novah.exe">server switcher</router-link>
									<a href="https://discord.gg/6VXJ3ky" target="_blank">Discord</a>
								</div>
							</div>
                        </div>
                    </div>
                    <div id="sideMenuBtn">
                        <button class="openbtn" v-on:click="openNav">
                            <!-- <i class="sideBtn fas fa-angle-right"></i> -->
                            <i class="sideBtn fas fa-stream"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>