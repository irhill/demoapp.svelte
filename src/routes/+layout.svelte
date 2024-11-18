<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/components/Button.svelte'

	let { children } = $props()
</script>

<style lang="scss">
	nav {
		background-color: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		border-bottom: 1px solid gray;
	}

	main {
		height: calc(100% - 100px);
		max-width: 1200px;
		margin: 100px auto 0;
		padding: 16px;
		background-color: #ffffff;
	}
</style>

<nav>
	<Button secondary={$page.url.pathname !== '/'} link="/" label="Home" />
	<Button secondary={$page.url.pathname !== '/cocktails'} link="/cocktails" label="Cocktails" />
</nav>

<main>
	{@render children()}
</main>
