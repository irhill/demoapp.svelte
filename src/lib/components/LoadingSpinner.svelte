<script lang="ts">
	interface LoadingSpinnerProps {
		size?: number
		color?: string
	}

	let { size = 20, color = '#ffffff' }: LoadingSpinnerProps = $props()
</script>

<style lang="scss">
	.spinner {
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

<svg class="spinner" viewBox="0 0 32 32" height={size} width={size}>
  <circle cx="16" cy="16" r="10" fill="none" stroke={color} stroke-dasharray="50, 100" stroke-width="2"></circle>
</svg>