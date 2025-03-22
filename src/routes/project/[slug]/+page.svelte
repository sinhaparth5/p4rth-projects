<script lang="ts">
    import type { Project } from '$lib/types/types';
    import projectsData from '../../../lib/schema/projects.json';
    const projects: Project[] = projectsData;
</script>
{#each projects as project}
    <h1>{project.title}</h1>
{/each}