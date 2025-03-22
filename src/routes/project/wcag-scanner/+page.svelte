<script lang="ts">
    import BackgroundBoxes from '../../../components/boxes.svelte';
    import styles from '../../../lib/css/components.module.css';
</script>

<main>
    <BackgroundBoxes />
    <div class={styles.content}>
        <article class="blog-post">
            <h1>The Future of Technology</h1>
            
            <div class="post-meta">
                <span class="date">March 22, 2025</span>
                <span class="author">By Tech Explorer</span>
                <span class="category">Innovation</span>
            </div>
            
            <div class="post-content">
                <enhanced:img 
                    src="../../../lib/img/ai-generated-girl.webp" 
                    alt="AI Generated Image" 
                    class="float-image"
                />
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus ipsum. Nam et sem id nulla fringilla dapibus. Nullam ultrices nisl risus, in viverra libero egestas sit amet.</p>
                
                <p>Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.</p>
                
                <p>Proin laoreet, ligula non elementum gravida, felis elit accumsan urna, nec pharetra quam eros non neque. Nulla mattis aliquet justo, a tincidunt nibh fermentum vel. Vestibulum at eros lorem. Vestibulum vel odio bibendum, elementum nisl et, mattis urna.</p>
                
                <p>Mauris eleifend nulla eget enim efficitur, vel ultricies orci euismod. Fusce posuere feugiat dignissim. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent in sagittis nisl. Nullam semper leo et erat pellentesque ultrices.</p>
                
                <p>Maecenas ut libero tincidunt, pellentesque elit vel, lacinia tortor. Integer semper vestibulum bibendum. Cras purus tortor, eleifend eget eros eget, molestie luctus arcu. Cras commodo neque vel eros consectetur ultricies. Duis vitae magna ac urna scelerisque faucibus. Duis euismod augue vel sagittis accumsan.</p>
                
                <p>Praesent augue urna, facilisis ac dapibus vel, commodo et lacus. Aenean in fermentum metus. Cras sed auctor sem. Nullam lobortis magna quis consequat ultrices. Donec consectetur lobortis sapien, at interdum sapien ornare in. Aenean a arcu ullamcorper, porta lorem eget, dignissim magna.</p>
            </div>
        </article>
    </div>
</main>

<style>
    .blog-post {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        line-height: 1.6;
    }
    
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }
    
    .post-meta {
        display: flex;
        gap: 1.5rem;
        font-size: 0.9rem;
        color: #777;
        margin-bottom: 2rem;
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 1rem;
    }
    
    .post-content {
        font-size: 1.1rem;
    }
    
    .float-image {
        float: left;
        width: 300px;
        height: auto;
        margin: 0 2rem 1rem 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    p {
        margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .float-image {
            float: none;
            display: block;
            width: 100%;
            margin: 0 0 2rem 0;
        }
        
        .blog-post {
            padding: 1.5rem;
        }
    }
    
    @media (prefers-color-scheme: dark) {
        .post-meta {
            color: #aaa;
            border-bottom-color: #333;
        }
    }
</style>