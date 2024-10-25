<script lang="ts">
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/poppins';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
