<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  export default {
    name: 'App',
    components: {
      'Navbar': Navbar,
	  'Footer': Footer
    },
	data() {
		return {
			tab: 'home'
		}
	}
  }
</script>

<style lang="css">
@font-face {
    font-family: 'TmoneyRoundWindRegular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindRegular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

*{margin: 0; padding: 0;}

html, body, #sapper {
	height: 100%;
}

main {
	position: relative;
	/* background-color: white; */
	/* padding: 2em; */
	margin: 0 auto;
	margin-top: 10px;
	width: 100%;
	box-sizing: border-box;
	border-radius: 8px;
	/* min-height: 1100px; */
	min-height: 86%;
	/* height: 100vh; */
}

a {
	text-decoration: none;
	/* color: white; */
}

body {
	margin: 0;
	/* font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
	font-family: 'TmoneyRoundWindRegular';
	font-weight: normal;
	font-style: normal;
	font-size: 14px;
	color: #000;
	background-color: #050317;
	background-image: url('assets/images/background.png');
}

@media (min-width: 576px) {
	.wrap {
		max-width: 540px;
	}
}

@media (min-width: 768px) {
	.wrap {
		max-width: 720px;
	}
}

@media (min-width: 992px) {
	.wrap {
		max-width: 960px;
	}
}

@media (min-width: 1200px) {
	.wrap {
		max-width: 1140px;
	}
}

.main-wrapper {
	padding: 2em;
	background-color: white;
	border-radius: 8px;
}

section {
	margin-bottom: 2em;
	background-color: white;
	border-radius: 8px;
}

section div.section-title {
	width: 100%;
	margin-bottom: 10px;
}

section div.section-title hr{
	width: 100px;
	vertical-align: baseline;
}

@font-face {
    font-family: FontAwesomeExtra;
    src: url(./assets/fonts/extra.ttf) format("truetype")
}

.faa {
    font-family: FontAwesomeExtra;
	font-style: normal;
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

.avatar {
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: 0 1px 3px rgba(0,0,0,.25);
    border-radius: 4px;
    width: 70px;
    height: 70px;
    flex: none;
    background-color: #333;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    display: block;
}

.score-rank {
    width: 2em;
    height: 1em;
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
}

.score-rank--tiny {
    font-size: 14px;
}

.score-rank--more-tiny {
    font-size: 10px;
}

.score-rank--XH{background-image:url(./assets/images/grade/GradeSmall-SS-Silver.6681366c.svg)}
.score-rank--X{background-image:url(./assets/images/grade/GradeSmall-SS.a21de890.svg)}
.score-rank--SH{background-image:url(./assets/images/grade/GradeSmall-S-Silver.811ae28c.svg)}
.score-rank--S{background-image:url(./assets/images/grade/GradeSmall-S.3b4498a9.svg)}
.score-rank--A{background-image:url(./assets/images/grade/GradeSmall-A.d785e824.svg)}
.score-rank--B{background-image:url(./assets/images/grade/GradeSmall-B.e19fc91b.svg)}
.score-rank--C{background-image:url(./assets/images/grade/GradeSmall-C.6bb75adc.svg)}
.score-rank--D{background-image:url(./assets/images/grade/GradeSmall-D.6b170c4c.svg)}

.mod {
    height: var(--mod-height,22px);
    width: calc(var(--mod-height, 22px)*45/32);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

.mod--NM {
    background-image: url(./assets/images/mods/mod_no-mod.png);
}
.mod--NF {
    background-image: url(./assets/images/mods/mod_no-fail.png);
}
.mod--EZ {
    background-image: url(./assets/images/mods/mod_easy.png);
}
.mod--TD {
    background-image: url(./assets/images/mods/mod_touchdevice.png);
}
.mod--HD {
    background-image: url(./assets/images/mods/mod_hidden.png);
}
.mod--NC {
    background-image: url(./assets/images/mods/mod_nightcore.png);
}
.mod--DT {
    background-image: url(./assets/images/mods/mod_double-time.png);
}
.mod--HR {
    background-image: url(./assets/images/mods/mod_hard-rock.png);
}
.mod--PF {
    background-image: url(./assets/images/mods/mod_perfect.png);
}
.mod--RX {
    background-image: url(./assets/images/mods/mod_relax.png);
}
.mod--HT {
    background-image: url(./assets/images/mods/mod_half.png);
}
.mod--FL {
    background-image: url(./assets/images/mods/mod_flashlight.png);
}
.mod--AP {
    background-image: url(./assets/images/mods/mod_auto.png);
}
.mod--SO {
    background-image: url(./assets/images/mods/mod_spun-out.png);
}
.mod--AP {
    background-image: url(./assets/images/mods/mod_autopilot.png);
}
.mod--SD {
    background-image: url(./assets/images/mods/mod_sudden-death.png);
}
.mod--4K {
    background-image: url(./assets/images/mods/mod_4Kc.png);
}
.mod--5K {
    background-image: url(./assets/images/mods/mod_5Kc.png);
}
.mod--6K {
    background-image: url(./assets/images/mods/mod_6Kc.png);
}
.mod--7K {
    background-image: url(./assets/images/mods/mod_7Kc.png);
}
.mod--8K {
    background-image: url(./assets/images/mods/mod_8Kc.png);
}
.mod--FadeIn {
    background-image: url(./assets/images/mods/mod_fader.png);
}
.mod--Random {
    background-image: url(./assets/images/mods/mod_random.png);
}
.mod--CN {
    background-image: url(./assets/images/mods/mod_cinema.png);
}
.mod--9K {
    background-image: url(./assets/images/mods/mod_9Kc.png);
}
.mod--1K {
    background-image: url(./assets/images/mods/mod_1Kc.png);
}
.mod--3K {
    background-image: url(./assets/images/mods/mod_3Kc.png);
}
.mod--2K {
    background-image: url(./assets/images/mods/mod_2Kc.png);
}

.flag-country {
    --height: 1.25em;
    --width-height-ratio: 1.48936;
    box-shadow: 0 1px 3px rgba(0,0,0,.25);
    height: var(--height);
    width: calc(var(--height)*var(--width-height-ratio));
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
}

.flag-country--flat {
	box-shadow: none;
}

div.btn {
	padding: 12.5px 55px;
	display: inline-flex;
	text-align: center;
	color: white;
	background-image: url('./assets/images/button.svg');
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

.pace {
	-webkit-pointer-events: none;
	pointer-events: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}

.pace-inactive {
	display: none;
}

.pace .pace-progress {
	background: #39acf3;
	position: fixed;
	z-index: 2000;
	top: 0;
	right: 100%;
	width: 100%;
	height: 4px;
}

.pace .pace-progress-inner {
	display: block;
	position: absolute;
	right: 0px;
	width: 100px;
	height: 100%;
	box-shadow: 0 0 10px #39acf3, 0 0 5px #39acf3;
	opacity: 1.0;
	-webkit-transform: rotate(3deg) translate(0px, -4px);
	-moz-transform: rotate(3deg) translate(0px, -4px);
	-ms-transform: rotate(3deg) translate(0px, -4px);
	-o-transform: rotate(3deg) translate(0px, -4px);
	transform: rotate(3deg) translate(0px, -4px);
}

.pace .pace-activity {
	display: block;
	position: fixed;
	z-index: 2000;
	top: 19px;
	right: 15px;
	width: 14px;
	height: 14px;
	border: solid 2px transparent;
	border-top-color: #39acf3;
	border-left-color: #39acf3;
	border-radius: 10px;
	-webkit-animation: pace-spinner 400ms linear infinite;
	-moz-animation: pace-spinner 400ms linear infinite;
	-ms-animation: pace-spinner 400ms linear infinite;
	-o-animation: pace-spinner 400ms linear infinite;
	animation: pace-spinner 400ms linear infinite;
}

@-webkit-keyframes pace-spinner {
	0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}
@-moz-keyframes pace-spinner {
	0% { -moz-transform: rotate(0deg); transform: rotate(0deg); }
	100% { -moz-transform: rotate(360deg); transform: rotate(360deg); }
}
@-o-keyframes pace-spinner {
	0% { -o-transform: rotate(0deg); transform: rotate(0deg); }
	100% { -o-transform: rotate(360deg); transform: rotate(360deg); }
}
@-ms-keyframes pace-spinner {
	0% { -ms-transform: rotate(0deg); transform: rotate(0deg); }
	100% { -ms-transform: rotate(360deg); transform: rotate(360deg); }
}
@keyframes pace-spinner {
	0% { transform: rotate(0deg); transform: rotate(0deg); }
	100% { transform: rotate(360deg); transform: rotate(360deg); }
}
</style>

<template>
  <div id="app">
    <Navbar></Navbar>
	<main class="wrap">
    	<router-view/>
	</main>
	<Footer></Footer>
  </div>
</template>