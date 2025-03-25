<script lang="ts">
    import BackgroundBoxes from '../../../components/boxes.svelte';
    import styles from '../../../lib/css/components.module.css';
    import Sidebar from '../../../components/Sidebar.svelte';
    import HamburgerMenu from '../../../components/HamburgerMenu.svelte';
    import { onMount } from 'svelte';
    import MathEquation from '../../../components/MathEquation.svelte';
    import GithubLink from '../../../components/GithubLink.svelte';

    // Mobile menu state
    let isMobileMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
    
    // Close mobile menu 
    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }
    
    // Close mobile menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Element;
        if (isMobileMenuOpen && 
            !target.closest('.sidebar') && 
            !target.closest('.hamburger-menu')) {
            isMobileMenuOpen = false;
        }
    }
    
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // Define all LaTeX equations as variables for better maintainability
    const equations = {
        n: "N",
        m: "M",
        nEquals3: "N = 3",
        mEquals5: "M = 5",
        tEquals1: "t=1",
        statesSet: "S = \\{S_1, S_2, \\ldots, S_N\\}",
        observationsSet: "O = \\{O_1, O_2, \\ldots, O_M\\}",
        piVector: "\\pi = [\\pi_1, \\pi_2, \\ldots, \\pi_N]",
        piProbability: "\\pi_i = P(q_1 = S_i)",
        piSum: "\\sum_{i=1}^N \\pi_i = 1",
        nTimesN: "N \\times N",
        aMatrix: "A = [a_{ij}]",
        aTransition: "a_{ij} = P(q_{t+1} = S_j | q_t = S_i)",
        aSum: "\\sum_{j=1}^N a_{ij} = 1",
        i: "i",
        nTimesM: "N \\times M",
        bMatrix: "B = [b_{jk}]",
        bEmission: "b_{jk} = P(O_t = k | q_t = S_j)",
        bSum: "\\sum_{k=1}^M b_{jk} = 1",
        j: "j",
        lambdaTriplet: "\\lambda = (A, B, \\pi)",
        markovProperty: "P(q_{t+1} | q_t, q_{t-1}, \\ldots, q_1) = P(q_{t+1} | q_t)",
        t: "t",
        observationIndependence: "P(O_t | q_t, q_{t-1}, O_{t-1}, \\ldots) = P(O_t | q_t)",
        observationSequence: "O = (O_1, O_2, \\ldots, O_T)",
        lambda: "\\lambda",
        probability: "P(O | \\lambda)",
        stateSequence: "Q = (q_1, q_2, \\ldots, q_T)",
        forwardVariable: "\\alpha_t(i) = P(O_1, O_2, \\ldots, O_t, q_t = S_i | \\lambda)",
        observationSequenceT: "O_1, O_2, \\ldots, O_t",
        si: "S_i",
        initialization: "\\alpha_1(i) = \\pi_i b_i(O_1), \\quad i = 1, 2, \\ldots, N",
        recursion: "\\begin{align} \\alpha_{t+1}(j) &= b_j(O_{t+1}) \\sum_{i=1}^N \\alpha_t(i) a_{ij}, \\\\ &\\quad t = 1, 2, \\ldots, T-1, \\\\ &\\quad j = 1, 2, \\ldots, N \\end{align}",
        termination: "P(O | \\lambda) = \\sum_{i=1}^N \\alpha_T(i)"
    };
</script>

<div class="layout" class:menu-open={isMobileMenuOpen}>
    <!-- Hamburger menu button (mobile only) -->
    <HamburgerMenu isOpen={isMobileMenuOpen} on:click={toggleMobileMenu} />
    
    <!-- Overlay for mobile menu -->
    {#if isMobileMenuOpen}
        <div class="mobile-overlay" on:click={closeMobileMenu}></div>
    {/if}
    
    <!-- Sidebar component -->
    <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        on:closemenu={closeMobileMenu} 
    />

    <main>
        <BackgroundBoxes />
        <article class={styles.blogPost}>
            <h1>Hidden Markov Models for Stock Market Analysis</h1>
            
            <div class={styles.postMeta}>
                <span class="date">March 24, 2025</span>
                <span class="author">By Parth Sinha</span>
                <span class="category">Finance & Machine Learning</span>
            </div>
            
            <div class={styles.postContent}>
                <enhanced:img 
                    src="../../../lib/img/hmm_states_lt.png" 
                    alt="Hidden Markov Model States Visualization" 
                    class={styles.floatImage1}
                />
                
                <h1>Introduction</h1>
                <p>The stock market is a complex system influenced by countless factors—economic indicators, geopolitical events, investor sentiment, and more. For traders and investors, understanding the market's current "regime" (e.g., Bull, Sideways, or Bear) can be crucial for making informed decisions. In this blog post, we'll explore how to use a Hidden Markov Model (HMM) to detect market regimes in the stock price of Larsen & Toubro (L&T), a major Indian company, using historical data from 2022 to 2023.</p>
                
                <p>We'll cover:</p>
                <ul>
                    <li>The theory and mathematics behind HMMs.</li>
                    <li>How HMMs can be applied to financial time series data.</li>
                    <li>A step-by-step explanation of the Python implementation.</li>
                    <li>The results and interpretation of the model applied to L&T stock.</li>
                </ul>
                
                <p>By the end, you'll have a deep understanding of HMMs and how they can be used to uncover hidden patterns in stock market data.</p>
                
                <h2>What is a Hidden Markov Model (HMM)?</h2>
                <p>A Hidden Markov Model is a statistical model used to represent systems that transition between a set of hidden states over time, where each state generates observable data (emissions) according to some probability distribution. HMMs are widely used in fields like speech recognition, bioinformatics, and finance because they can model sequential data with underlying hidden patterns.</p>
                
                <h2>Key Components of an HMM</h2>
                <p>An HMM is defined by the following components:</p>
                
                <ol>
                    <li>
                        <p><strong>Hidden States (S)</strong>: A set of states that are not directly observable. In our case, these represent market regimes: Bull (upward trend), Sideways (neutral trend), and Bear (downward trend). Let's denote the number of states as <span class={styles.mathInline}><MathEquation equation={equations.n} displayMode={false} /></span>, so <span class={styles.mathInline}><MathEquation equation={equations.statesSet} displayMode={false} /></span>. For us, <span class={styles.mathInline}><MathEquation equation={equations.nEquals3} displayMode={false} /></span>.</p>
                    </li>
                    
                    <li>
                        <p><strong>Observations (O)</strong>: The observable data generated by the hidden states. In our case, these are discretized daily percentage returns of the stock price (e.g., large down, small down, neutral, small up, large up). Let's denote the number of possible observations as <span class={styles.mathInline}><MathEquation equation={equations.m} displayMode={false} /></span>, so <span class={styles.mathInline}><MathEquation equation={equations.observationsSet} displayMode={false} /></span>. For us, <span class={styles.mathInline}><MathEquation equation={equations.mEquals5} displayMode={false} /></span>.</p>
                    </li>
                    
                    <li>
                        <p><strong>Initial State Probabilities (π)</strong>: The probability of starting in each state at time <span class={styles.mathInline}><MathEquation equation={equations.tEquals1} displayMode={false} /></span>. This is a vector <span class={styles.mathInline}><MathEquation equation={equations.piVector} displayMode={false} /></span>, where <span class={styles.mathInline}><MathEquation equation={equations.piProbability} displayMode={false} /></span> and <span class={styles.mathInline}><MathEquation equation={equations.piSum} displayMode={false} /></span>.</p>
                    </li>
                    
                    <li>
                        <p><strong>Transition Probabilities (A)</strong>: The probability of transitioning from one state to another. This is an <span class={styles.mathInline}><MathEquation equation={equations.nTimesN} displayMode={false} /></span> matrix <span class={styles.mathInline}><MathEquation equation={equations.aMatrix} displayMode={false} /></span>, where <span class={styles.mathInline}><MathEquation equation={equations.aTransition} displayMode={false} /></span> and <span class={styles.mathInline}><MathEquation equation={equations.aSum} displayMode={false} /></span> for each <span class={styles.mathInline}><MathEquation equation={equations.i} displayMode={false} /></span>.</p>
                    </li>
                    
                    <li>
                        <p><strong>Emission Probabilities (B)</strong>: The probability of observing a particular observation given a state. This is an <span class={styles.mathInline}><MathEquation equation={equations.nTimesM} displayMode={false} /></span> matrix <span class={styles.mathInline}><MathEquation equation={equations.bMatrix} displayMode={false} /></span>, where <span class={styles.mathInline}><MathEquation equation={equations.bEmission} displayMode={false} /></span> and <span class={styles.mathInline}><MathEquation equation={equations.bSum} displayMode={false} /></span> for each <span class={styles.mathInline}><MathEquation equation={equations.j} displayMode={false} /></span>.</p>
                    </li>
                </ol>
                
                <p>An HMM is fully specified by the triplet <span class={styles.mathInline}><MathEquation equation={equations.lambdaTriplet} displayMode={false} /></span>.</p>
                
                <h2>HMM Assumptions</h2>
                <ol>
                    <li>
                        <p><strong>Markov Property</strong>: The probability of transitioning to the next state depends only on the current state, not on the sequence of states that preceded it. Mathematically, <span class={styles.mathInline}><MathEquation equation={equations.markovProperty} displayMode={false} /></span>.</p>
                    </li>
                    
                    <li>
                        <p><strong>Observation Independence</strong>: The observation at time <span class={styles.mathInline}><MathEquation equation={equations.t} displayMode={false} /></span> depends only on the state at time <span class={styles.mathInline}><MathEquation equation={equations.t} displayMode={false} /></span>, not on previous states or observations. Mathematically, <span class={styles.mathInline}><MathEquation equation={equations.observationIndependence} displayMode={false} /></span>.</p>
                    </li>
                </ol>
                
                <h2>HMM in Finance</h2>
                <p>In the context of stock market analysis:</p>
                <ul>
                    <li><strong>Hidden States</strong>: Represent market regimes (Bull, Sideways, Bear).</li>
                    <li><strong>Observations</strong>: Represent discretized daily percentage returns (e.g., large down: &lt; -3%, small down: -3% to -1%, neutral: -1% to 1%, small up: 1% to 3%, large up: &gt; 3%).</li>
                    <li><strong>Goal</strong>: Infer the most likely sequence of hidden states (market regimes) given the observed returns.</li>
                </ul>
                
                <h2>Mathematical Foundations of HMMs</h2>
                <p>HMMs are used to solve three fundamental problems:</p>
                
                <h3>Problem 1: Likelihood (Forward Algorithm)</h3>
                <p>Given an observation sequence <span class={styles.mathInline}><MathEquation equation={equations.observationSequence} displayMode={false} /></span> and a model <span class={styles.mathInline}><MathEquation equation={equations.lambdaTriplet} displayMode={false} /></span>, compute the probability of the observation sequence, <span class={styles.mathInline}><MathEquation equation={equations.probability} displayMode={false} /></span>.</p>
                
                <h3>Problem 2: Decoding (Viterbi Algorithm)</h3>
                <p>Given an observation sequence <span class={styles.mathInline}><MathEquation equation="O" displayMode={false} /></span> and a model <span class={styles.mathInline}><MathEquation equation={equations.lambda} displayMode={false} /></span>, find the most likely sequence of hidden states <span class={styles.mathInline}><MathEquation equation={equations.stateSequence} displayMode={false} /></span>.</p>
                
                <h3>Problem 3: Learning (Baum-Welch Algorithm)</h3>
                <p>Given an observation sequence <span class={styles.mathInline}><MathEquation equation="O" displayMode={false} /></span>, estimate the model parameters <span class={styles.mathInline}><MathEquation equation={equations.lambdaTriplet} displayMode={false} /></span> that maximize <span class={styles.mathInline}><MathEquation equation={equations.probability} displayMode={false} /></span>.</p>
                
                <p>Let's explore the mathematics behind each of these problems as implemented in your code.</p>
                
                <h3>1. Forward Algorithm (Likelihood)</h3>
                <p>The forward algorithm computes <span class={styles.mathInline}><MathEquation equation={equations.probability} displayMode={false} /></span> efficiently using dynamic programming. It introduces a forward variable <span class={styles.mathInline}><MathEquation equation="\\alpha_t(i)" displayMode={false} /></span>, defined as:</p>
                
                <div class={styles.mathBlock}>
                    <MathEquation equation={equations.forwardVariable} displayMode={true} />
                </div>
                
                <p>This is the probability of observing the sequence <span class={styles.mathInline}><MathEquation equation={equations.observationSequenceT} displayMode={false} /></span> and being in state <span class={styles.mathInline}><MathEquation equation={equations.si} displayMode={false} /></span> at time <span class={styles.mathInline}><MathEquation equation={equations.t} displayMode={false} /></span>.</p>
                
                <p><strong>Initialization:</strong></p>
                <div class={styles.mathBlock}>
                    <MathEquation equation={equations.initialization} displayMode={true} />
                </div>
                
                <p><strong>Recursion:</strong></p>
                <div class="{styles.mathBlock} {styles.recursionEquation}">
                    <MathEquation equation={equations.recursion} displayMode={true} />
                </div>
                
                <p><strong>Termination:</strong></p>
                <div class={styles.mathBlock}>
                    <MathEquation equation={equations.termination} displayMode={true} />
                </div>
                <div class="test">
                    <GithubLink url="https://github.com/sinhaparth5/hmnn_stock.git" label="HMM Github Link" />
                </div>
            </div>
        </article>
    </main>
</div>

<style>
    .layout {
        position: relative;
        min-height: 100vh;
    }
    
    .main-content {
        width: 100%;
    }
    
    .mobile-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 90;
    }

    .menu-open .mobile-overlay {
        display: block;
    }
</style>