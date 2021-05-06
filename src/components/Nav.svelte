<script>
	export let segment;
</script>

<style>
	@media (min-width: 576px) {
		.wrap { max-width: 550px; }
	}

	@media (min-width: 768px) {
		.wrap { max-width: 730px; }
	}

	@media (min-width: 992px) {
		.wrap { max-width: 970px; }
	}

	@media (min-width: 1200px) {
		.wrap { max-width: 1240px; }
	}

	nav {
		font-weight: 300;
		padding: 0 1em;
		background-color: rgb(22 18 52 / 70%);
	}

	a {
		text-decoration: none;
		font-size: 16px;
		padding: 16px;
		display: block;
		color: white;
	}

	nav div { margin: 0 auto; }

	nav div ul {
		margin: 0 auto;
		padding: 0;
		display: flex;
		align-items: center;
	}

	@media (min-width: 0){
		nav div ul { display: none; }
	}

	@media (min-width: 768px){
		nav div ul { display: none; }
	}

	@media (min-width: 769px){
		nav div ul { display: flex; }
	}

	nav div ul::after {
		content: '';
		display: block;
		clear: both;
		visibility: hidden;
	}

	nav div ul li {
		display: block;
		float: left;
		text-align: center;
		height: 54px;
	}

	a.logo {
		font-size: 12px;
		padding: 0;
	}

	nav ul li a.logo h1 {
		background: url('https://debian.moe/static/debian-trans.png') no-repeat center / cover;
		width: 54px;
		height: 54px;
	}

	nav ul li a.logo:hover h1{
		width: 58px;
		height: 58px;
		transition: all 200ms cubic-bezier(1, 0.08, 1, 1)
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 36px);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: 0px;
	}

	nav li{
		transition: all 0.2s ease;
		-webkit-transition: all 0.2s ease;
		-moz-transition: all 0.2s ease;
		-o-transition: all 0.2s ease;
	}

	nav:hover li:nth-of-type(n + 2) { opacity: 0.2; }

	nav:hover ul:hover li:nth-of-type(n + 2) { opacity: 0.5; }

	nav:hover ul:hover li:nth-of-type(n + 2):hover { opacity: 1; }

	.dropbtn {
		font-size: 16px;
		background-color: #100e2c;
		color: white;
		padding: 16px;
		border: none;
		height: 54px;
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #17152b;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		border-radius: 12px;
		z-index: 1;
	}

	.dropdown-content a {
		font-size: 14px;
		padding: 8px 4px;
		text-decoration: none;
		display: block;
		color: #a5a5a5;
	}

	.dropdown-content a:hover {background-color: rgba(255, 255, 255, 0.15);}

	.dropdown:hover .dropdown-content {display: block;}

	hr {
		border: 1px solid rgba(255, 255, 255, 0.35);
	}
</style>

<nav>
	<div class="wrap">
		<ul>
			<li>
				<a class="logo" href="."><h1></h1></a>
			</li>
			<li>
				<a aria-current="{segment === 'leaderboard' ? 'page' : undefined}" href="leaderboard">leaderboard</a>
			</li>
			<li>
				<a aria-current="{segment === 'about' ? 'page' : undefined}" href="beatmaps">beatmaps</a>
			</li>
			<li>
				<div class="dropdown">
					<button class="dropbtn">community</button>
					<div class="dropdown-content">
						<a href="clan">clan</a>
						<a href="topplay">Top Plays</a>
						<a href="matches">matches</a>
					</div>
				</div>
			</li>
			<li>
				<div class="dropdown">
					<button class="dropbtn">help</button>
					<div class="dropdown-content">
						<a href="about">about</a>
						<a href="docs">docs</a>
						<a href="docs/rule">rule</a>
						<a href="terms">Terms of service</a>
						<hr>
						<a href="Novah.exe">server switcher</a>
						<a href="https://discord.gg/6VXJ3ky" target="_blank">Discord</a>
					</div>
				</div>
			</li>
		</ul>
	</div>
</nav>