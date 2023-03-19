<style lang="scss" src="./styles/preloader.scss"></style>
<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    // Animation pages
    const pages: string[] = [
        `
  /\\_/\\
=( °w° )=
  )   (  //
 (__ __)//
        `,
        `
  /\\_/\\
=( °w° )=
  )   ( //
 (__ __)//
        `,
        `
  /\\_/\\
=( °w° )=
  )   (\\\\
 (__ __)//
        `,
        `
  /\\_/\\
=( ^w^ )=
  )   ( //
 (__ __)//
        `
    ];

    // States variable
    let ready = false;
    onMount(() => {
        ready = true;
        animate();
    });

    // Transition configurations
    const tArtIn = { duration: 200, delay: 100, y: 32 };
    const tArtOut = { duration: 200, y: -32 };
    const tContainerIn = { duration: 200 };
    const tContainerOut = { duration: 200, delay: 100 };

    // Animation variables
    let pageN: number = 0;
    let page: string;
    $: page = pages[pageN];

    /** Animate */
    async function animate(): Promise<void> {
        if (!ready) return;
        pageN = pageN == pages.length - 1
            ? 0 : pageN + 1;
        await new Promise(r => setTimeout(r, 500));
        animate();
    }
</script>

{#if ready}
    <div class="loader" in:fade={tContainerIn} out:fade={tContainerOut}>
        <div class="ascii-box" in:fly={tArtIn} out:fly={tArtOut}>
            <pre>{page}</pre>
        </div>
    </div>
{/if}
