<script lang="ts">
    import { page } from '$app/stores';
    import { onMount, createEventDispatcher } from 'svelte';
    
    // Props
    export let isMobileMenuOpen = false;
    
    // Project links (you can pass this as a prop instead if needed)
    export let projects = [
        { id: 1, name: "WCAG Scanner", slug: "wcag-scanner" },
        { id: 2, name: "E-commerce Dashboard", slug: "ecommerce-dashboard" },
        { id: 3, name: "Weather App", slug: "weather-app" },
        { id: 4, name: "Task Management Tool", slug: "task-management" }
    ];
    
    // Event dispatcher to communicate with parent
    const dispatch = createEventDispatcher();
    
    // Close mobile menu when clicking a link
    function handleLinkClick() {
        dispatch('closemenu');
    }
</script>

<aside class="sidebar" class:open={isMobileMenuOpen}>
    <nav>
        <div class="nav-section">
            <a 
                href="/" 
                class="nav-link home-link {$page.url.pathname === '/' ? 'active' : ''}"
                on:click={handleLinkClick}
            >
                Home
            </a>
        </div>
        
        <div class="nav-section">
            <h3>Projects</h3>
            <ul class="projects-list">
                {#each projects as project}
                    <li>
                        <a 
                            href="/project/{project.slug}" 
                            class="nav-link {$page.url.pathname === `/project/${project.slug}` ? 'active' : ''}"
                            on:click={handleLinkClick}
                        >
                            {project.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
</aside>

<style>
    .sidebar {
        width: 250px;
        background-color: rgba(25, 25, 30, 0.9);
        color: #fff;
        padding: 2rem 0;
        position: fixed;
        height: 100vh;
        overflow-y: auto;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 100;
    }
    
    .nav-section {
        margin-bottom: 2rem;
        padding: 0 1.5rem;
    }
    
    .nav-section h3 {
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 1rem;
        color: #aaa;
        font-weight: 600;
    }
    
    .projects-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .nav-link {
        display: block;
        padding: 0.75rem 0;
        color: #ddd;
        text-decoration: none;
        transition: color 0.2s;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .nav-link:hover {
        color: #fff;
    }
    
    .nav-link.active {
        color: #39FF14; /* Neon green to match the boxes */
        font-weight: 600;
    }
    
    .home-link {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    
    /* Responsive styles */
    @media (max-width: 900px) {
        .sidebar {
            width: 200px;
        }
    }
    
    @media (max-width: 768px) {
        .sidebar {
            width: 280px;
            left: -100%;
            transition: left 0.3s ease;
        }
        
        .sidebar.open {
            left: 0;
        }
    }
</style>