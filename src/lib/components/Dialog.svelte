<script lang="ts">
	interface DialogProps {
		dialog: HTMLDialogElement,
		title: string,
		children: any
	}
	let { dialog = $bindable(), title, children }: DialogProps = $props()
</script>

<style lang="scss">
	dialog {
    max-width: 80vw;

    div.header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        cursor: pointer;
      }
    }
  }
</style>

<dialog bind:this={dialog}>
	<div class="header">
		<h3>{title}</h3>
		<span onclick={() => dialog.close()}>[X]</span>
	</div>
	{@render children()}
</dialog>