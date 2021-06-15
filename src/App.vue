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
}

a {
	text-decoration: none;
	color: white;
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