<script>
	export const TokenStatusTypes = {
		TOKEN_OK: 'TOKEN_OK',
		TOKEN_FAKE: 'TOKEN_FAKE',
		TOKEN_DAMAGED: 'TOKEN_DAMAGED',
		TOKEN_TAMPERED: 'TOKEN_TAMPERED'
	}

	const TokenColors = [
		'#BBBBBB'
	]

	export let status = TokenStatusTypes.TOKEN_OK;
	export let color = 0;TokenStatusTypes
</script>

<main>
	Token component
	Status {status}, color {color}
</main>

<style>
</style>