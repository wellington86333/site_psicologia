document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Quiz Logic
    const quizData = [
        {
            question: "Nas últimas 2 semanas, com que frequência você se sentiu triste ou deprimido?",
            options: [
                { text: "Nunca", score: 0 },
                { text: "Alguns dias", score: 1 },
                { text: "Mais da metade dos dias", score: 2 },
                { text: "Quase todos os dias", score: 3 }
            ]
        },
        {
            question: "Você tem sentido dificuldade em concentrar-se em tarefas diárias?",
            options: [
                { text: "Nunca", score: 0 },
                { text: "Raramente", score: 1 },
                { text: "Frequentemente", score: 2 },
                { text: "Sempre", score: 3 }
            ]
        },
        {
            question: "Com que frequência você se sente ansioso ou preocupado excessivamente?",
            options: [
                { text: "Nunca", score: 0 },
                { text: "Alguns dias por mês", score: 1 },
                { text: "Várias vezes por semana", score: 2 },
                { text: "Diariamente", score: 3 }
            ]
        },
        {
            question: "Você tem tido dificuldade para dormir (insônia ou sono excessivo)?",
            options: [
                { text: "Nunca", score: 0 },
                { text: "1-2 noites por semana", score: 1 },
                { text: "3-4 noites por semana", score: 2 },
                { text: "Quase todas as noites", score: 3 }
            ]
        },
        {
            question: "Você sente que perdeu o interesse em atividades que antes gostava?",
            options: [
                { text: "Não", score: 0 },
                { text: "Um pouco", score: 1 },
                { text: "Moderadamente", score: 2 },
                { text: "Muito", score: 3 }
            ]
        },
        {
            question: "Você se sente sobrecarregado(a) com as responsabilidades diárias?",
            options: [
                { text: "Nunca", score: 0 },
                { text: "Raramente", score: 1 },
                { text: "Frequentemente", score: 2 },
                { text: "Sempre", score: 3 }
            ]
        },
        {
            question: "Você tem sentido dificuldade em manter relacionamentos saudáveis?",
            options: [
                { text: "Não", score: 0 },
                { text: "Levemente", score: 1 },
                { text: "Moderadamente", score: 2 },
                { text: "Severamente", score: 3 }
            ]
        },
        {
            question: "Você sente que sua autoestima está baixa ultimamente?",
            options: [
                { text: "Não", score: 0 },
                { text: "Às vezes", score: 1 },
                { text: "Frequentemente", score: 2 },
                { text: "Sempre", score: 3 }
            ]
        }
    ];

    let currentQuestion = 0;
    let totalScore = 0;
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('quiz-result');

    function loadQuiz() {
        quizContainer.innerHTML = '';
        
        quizData.forEach((data, index) => {
            const questionCard = document.createElement('div');
            questionCard.classList.add('question-card');
            if (index === 0) questionCard.classList.add('active');
            questionCard.dataset.index = index;

            const questionText = document.createElement('h3');
            questionText.classList.add('question-text');
            questionText.innerText = `${index + 1}. ${data.question}`;

            const optionsGrid = document.createElement('div');
            optionsGrid.classList.add('options-grid');

            data.options.forEach(option => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.innerText = option.text;
                btn.addEventListener('click', () => handleAnswer(option.score));
                optionsGrid.appendChild(btn);
            });

            questionCard.appendChild(questionText);
            questionCard.appendChild(optionsGrid);
            quizContainer.appendChild(questionCard);
        });

        // Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('quiz-progress');
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.id = 'progress-bar';
        progressContainer.appendChild(progressBar);
        quizContainer.appendChild(progressContainer);
    }

    function handleAnswer(score) {
        totalScore += score;
        const cards = document.querySelectorAll('.question-card');
        cards[currentQuestion].classList.remove('active');
        
        currentQuestion++;
        
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;

        if (currentQuestion < quizData.length) {
            cards[currentQuestion].classList.add('active');
        } else {
            showResult();
        }
    }

    function showResult() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        let title, message, colorClass;

        if (totalScore <= 5) {
            title = "Baixo Nível de Estresse";
            message = "Você parece estar lidando bem com suas emoções. Continue cuidando de si mesmo! Se sentir necessidade de conversar, estou à disposição.";
            colorClass = "text-success";
        } else if (totalScore <= 12) {
            title = "Sinais de Alerta Moderados";
            message = "Você pode estar enfrentando alguns desafios emocionais. A terapia pode ajudar a prevenir que esses sentimentos se intensifiquem.";
            colorClass = "text-warning";
        } else {
            title = "Recomendação de Apoio Profissional";
            message = "Seus resultados indicam um nível significativo de sofrimento emocional. Buscar ajuda profissional é um passo importante e corajoso para se sentir melhor.";
            colorClass = "text-danger";
        }

        resultContainer.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary);">${title}</h3>
                <p style="font-size: 1.1rem; margin-bottom: 2rem;">${message}</p>
                <a href="https://wa.me/5581999999999" class="btn btn-primary">Agendar Conversa Gratuita</a>
                <button onclick="location.reload()" class="btn btn-outline" style="margin-left: 10px;">Refazer Teste</button>
            </div>
        `;
    }

    loadQuiz();
});
