<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
	});
	NProgress.configure({
		showSpinner: false
	});
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />

<slot />
