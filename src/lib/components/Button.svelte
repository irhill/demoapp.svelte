<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'

	interface ButtonProps {
		label: string
		secondary?: boolean
		loading?: boolean
		link?: string
		onclick?: () => void
	}
	let { label, secondary = false, loading, link, onclick }: ButtonProps = $props()
</script>

<style lang="scss">
	button {
		height: 30px;
		border-radius: 15px;
		padding: 0 12px;
		border: none;
		color: #ffffff;
		background-color: #007bff;
		cursor: pointer;

		&.loading {
			pointer-events: none;
		}

		& > a {
			text-decoration: none;
			color: #ffffff;
		}

		&.secondary {
			border: 1px solid #007bff;
			color: #007bff;
			background-color: #ffffff;

			a {
				color: #007bff;
			}
		}
	}
</style>

<button class:secondary={secondary} class:loading={loading} onclick={onclick}>
	{#if loading}
		<LoadingSpinner size={24} />
	{:else}
		{#if link}
			<a href={link}>{label}</a>
		{:else}
			{label}
		{/if}
	{/if}
</button>