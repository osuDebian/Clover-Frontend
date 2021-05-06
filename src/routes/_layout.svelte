<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: #909090;
		padding: 2em;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main class="wrap">
	<slot></slot>
</main>

<Footer {segment}/>