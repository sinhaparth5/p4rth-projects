<script lang="ts">
    import BackgroundBoxes from '../../../components/boxes.svelte';
    import styles from '../../../lib/css/components.module.css'
</script>

<main>
    <BackgroundBoxes />
    <div class={styles.content}>
        <h1>Your Content Here</h1>
        <p>This text and images will remain readable over the neon boxes.</p>
    </div>
    <enhanced:img src="../../../lib/img/ai-generated-girl.webp" alt="Image" />
</main>