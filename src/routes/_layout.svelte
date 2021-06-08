<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: white;
		/* padding: 2em; */
		margin: 0 auto;
		margin-top: 10px;
		width: 100%;
		box-sizing: border-box;
		border-radius: 8px;
		/* min-height: 1100px; */
		min-height: 86%;
	}
</style>

<Nav {segment}/>

<main class="wrap">
	<slot></slot>
</main>

<Footer {segment}/>