document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Highlight active page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Quiz logic
    const quizQuestions = [
        {
            question: "Qual é o tipo de criptografia da Cifra de César?",
            options: ["Criptografia Histórica", "Criptografia Simétrica", "Criptografia Assimétrica", "Criptografia Híbrida"],
            correct: "Criptografia Histórica"
        },
        {
            question: "Qual é a função principal do HTTPS?",
            options: ["Proteger a navegação na web", "Criar túneis seguros", "Validar transações de criptomoedas", "Criptografar discos"],
            correct: "Proteger a navegação na web"
        },
        {
            question: "Para que serve a Função Hash?",
            options: ["Verificar a integridade de dados", "Criptografar mensagens", "Proteger senhas diretamente", "Comunicação online segura"],
            correct: "Verificar a integridade de dados"
        },
        {
            question: "Qual é a característica principal da Criptografia Simétrica?",
            options: ["Usa uma única chave", "Usa duas chaves", "Gera um código hash", "Desloca letras historicamente"],
            correct: "Usa uma única chave"
        },
        {
            question: "Qual tipo de criptografia é amplamente usado no Blockchain?",
            options: ["Função Hash", "Criptografia Simétrica", "Criptografia Assimétrica", "Criptografia Híbrida"],
            correct: "Função Hash"
        },
        {
            question: "Qual é a função principal de uma VPN?",
            options: ["Proteger dados em redes públicas", "Criptografar mensagens de e-mail", "Gerar chaves públicas", "Validar transações"],
            correct: "Proteger dados em redes públicas"
        },
        {
            question: "O que caracteriza a Criptografia Híbrida?",
            options: ["Combina simétrica e assimétrica", "Usa apenas uma chave", "Gera hashes", "Desloca letras"],
            correct: "Combina simétrica e assimétrica"
        },
        {
            question: "Qual é um dos principais objetivos da criptografia?",
            options: ["Garantir privacidade", "Aumentar velocidade de conexão", "Criar interfaces gráficas", "Gerar senhas aleatórias"],
            correct: "Garantir privacidade"
        }
    ];

    let currentQuestion = 0;
    let quizScore = 0;
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsEl = document.getElementById('quiz-options');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    const quizScoreEl = document.getElementById('quiz-score');
    const nextQuestionBtn = document.getElementById('next-question');
    const progressFill = document.getElementById('progress-fill');

    function updateProgress() {
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    function loadQuestion() {
        if (!quizQuestionEl || !quizOptionsEl || !quizFeedbackEl || !quizScoreEl || !progressFill) {
            console.error('Erro: Elementos do quiz não encontrados.');
            return;
        }
        const question = quizQuestions[currentQuestion];
        quizQuestionEl.textContent = question.question;
        quizOptionsEl.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('quiz-option');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            quizOptionsEl.appendChild(button);
        });
        quizFeedbackEl.textContent = '';
        quizOptionsEl.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('correct', 'incorrect'));
        nextQuestionBtn.disabled = true;
        updateProgress();
    }

    function checkAnswer(selected) {
        const question = quizQuestions[currentQuestion];
        quizOptionsEl.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === question.correct) {
                btn.classList.add('correct');
            } else if (btn.textContent === selected && selected !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
        if (selected === question.correct) {
            quizScore++;
        } else {
            quizFeedbackEl.textContent = `Errado. A resposta correta é "${question.correct}".`;
        }
        quizScoreEl.textContent = `Pontuação: ${quizScore}/${quizQuestions.length}`;
        nextQuestionBtn.disabled = false;
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                loadQuestion();
            } else {
                quizQuestionEl.textContent = 'Quiz Concluído!';
                quizOptionsEl.innerHTML = '';
                quizFeedbackEl.textContent = `Parabéns! Sua pontuação final é ${quizScore}/${quizQuestions.length}.`;
                nextQuestionBtn.textContent = 'Reiniciar Quiz';
                nextQuestionBtn.addEventListener('click', () => {
                    currentQuestion = 0;
                    quizScore = 0;
                    quizScoreEl.textContent = `Pontuação: 0/${quizQuestions.length}`;
                    nextQuestionBtn.textContent = 'Próxima Pergunta';
                    loadQuestion();
                }, { once: true });
            }
        });
    }

    if (quizQuestionEl) loadQuestion();

    // Match exercise logic (drag-and-drop)
    const matchAnswers = {
        simetrica: 'unica',
        assimetrica: 'publica',
        hash: 'hash',
        cifradecesar: 'historica'
    };

    const concepts = document.querySelectorAll('.match-concept');
    const descriptions = document.querySelectorAll('.match-description');
    const checkMatchBtn = document.getElementById('check-match');
    const matchFeedbackEl = document.getElementById('match-feedback');
    const matchScoreEl = document.getElementById('match-score');

    let draggedDescription = null;

    descriptions.forEach(desc => {
        desc.addEventListener('dragstart', () => {
            draggedDescription = desc;
            desc.classList.add('dragging');
        });
        desc.addEventListener('dragend', () => {
            desc.classList.remove('dragging');
        });
    });

    concepts.forEach(concept => {
        concept.addEventListener('dragover', e => {
            e.preventDefault();
            concept.classList.add('drop-target');
        });
        concept.addEventListener('dragleave', () => {
            concept.classList.remove('drop-target');
        });
        concept.addEventListener('drop', () => {
            concept.classList.remove('drop-target');
            if (draggedDescription) {
                concept.appendChild(draggedDescription);
            }
        });
    });

    if (checkMatchBtn && matchFeedbackEl && matchScoreEl) {
        checkMatchBtn.addEventListener('click', () => {
            let matchScore = 0;
            concepts.forEach(concept => {
                const conceptId = concept.dataset.concept;
                const description = concept.querySelector('.match-description');
                if (description && description.dataset.description === matchAnswers[conceptId]) {
                    matchScore++;
                    concept.classList.add('correct');
                } else {
                    concept.classList.add('incorrect');
                }
            });
            matchScoreEl.textContent = `Pontuação: ${matchScore}/4`;
            if (matchScore === 4) {
                matchFeedbackEl.textContent = 'Correto! Todos os conceitos foram ligados corretamente.';
                matchFeedbackEl.classList.add('correct');
            } else {
                matchFeedbackEl.textContent = `Errado. Você acertou ${matchScore}/4. Tente novamente!`;
            }
            checkMatchBtn.textContent = 'Tentar Novamente';
            checkMatchBtn.addEventListener('click', () => {
                concepts.forEach(concept => {
                    concept.classList.remove('correct', 'incorrect');
                    const desc = concept.querySelector('.match-description');
                    if (desc) document.querySelector('.match-descriptions').appendChild(desc);
                });
                matchFeedbackEl.textContent = '';
                matchScoreEl.textContent = 'Pontuação: 0/4';
                checkMatchBtn.textContent = 'Verificar Respostas';
            }, { once: true });
        });
    }

    // Caesar cipher simulator
    const caesarMessage = document.getElementById('caesar-message');
    const caesarShift = document.getElementById('caesar-shift');
    const caesarEncryptBtn = document.getElementById('caesar-encrypt');
    const caesarDecryptBtn = document.getElementById('caesar-decrypt');
    const caesarResult = document.getElementById('caesar-result');

    function caesarCipher(text, shift, encrypt = true) {
        if (!text || !shift) return '';
        shift = parseInt(shift);
        if (encrypt) shift = shift % 26;
        else shift = -shift % 26;
        return text.toUpperCase().replace(/[A-Z]/g, char => {
            const code = char.charCodeAt(0);
            let newCode = code + shift;
            if (newCode > 90) newCode -= 26;
            if (newCode < 65) newCode += 26;
            return String.fromCharCode(newCode);
        });
    }

    if (caesarEncryptBtn && caesarDecryptBtn && caesarResult) {
        caesarEncryptBtn.addEventListener('click', () => {
            const message = caesarMessage.value.trim();
            const shift = caesarShift.value.trim();
            if (!message || !shift || shift < 1 || shift > 25) {
                caesarResult.textContent = 'Por favor, insira uma mensagem válida e um deslocamento entre 1 e 25.';
                return;
            }
            caesarResult.textContent = `Mensagem criptografada: ${caesarCipher(message, shift, true)}`;
        });

        caesarDecryptBtn.addEventListener('click', () => {
            const message = caesarMessage.value.trim();
            const shift = caesarShift.value.trim();
            if (!message || !shift || shift < 1 || shift > 25) {
                caesarResult.textContent = 'Por favor, insira uma mensagem válida e um deslocamento entre 1 e 25.';
                return;
            }
            caesarResult.textContent = `Mensagem descriptografada: ${caesarCipher(message, shift, false)}`;
        });
    }
});