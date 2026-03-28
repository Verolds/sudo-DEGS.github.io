document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Project Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    const projectData = {
        'Sargasso Detection': {
            img: 'assets/sargasso.jpg',
            desc: 'A comprehensive Deep Learning solution for monitoring coastal environments in Mexico. Uses advanced CNN architectures to predict and detect sargassum influx.',
            tags: ['PyTorch', 'CNN', 'Data Science']
        },
        'RAG System': {
            img: 'assets/rag.jpg',
            desc: 'Cutting-edge Retrieval-Augmented Generation. Implements vector embeddings and LLM chains to create a searchable private documentation assistant.',
            tags: ['LangChain', 'Vector DB', 'LLMs']
        },
        'Liveness Face Rec': {
            img: 'assets/face.jpg',
            desc: 'Secure facial recognition system. Includes MTCNN for detection and InceptionResnetV1 for recognition, with integrated anti-spoofing blink checks.',
            tags: ['PyTorch', 'Computer Vision', 'Security']
        },
        'AI Sudoku Solver': {
            img: 'assets/sudoku.jpg',
            desc: 'An educational visualizer for the backtracking algorithm. Displays real-time solving process for complex Sudoku configurations.',
            tags: ['Python', 'Backtracking', 'Algorithms']
        },
        'Spam Shield': {
            img: 'assets/security.jpg',
            desc: 'Natural Language Processing pipeline to detect and classify communication threats. High-precision ML model for secure communication.',
            tags: ['Scikit-learn', 'NLP', 'Security']
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    projectCards.forEach(card => {
        // Modal Opening
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const data = projectData[title];
            
            if (data) {
                modalBody.innerHTML = `
                    <img src="${data.img}" class="modal-img">
                    <h2 class="modal-title">${title}</h2>
                    <p class="modal-desc">${data.desc}</p>
                    <div class="modal-tags">
                        ${data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                `;
                modal.style.display = 'flex';
            }
        });

        // Mouse Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -10;
            const rotateY = ((x / rect.width) - 0.5) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Simple reveal animation on scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, observerOptions);

    projectCards.forEach(card => observer.observe(card));
});
