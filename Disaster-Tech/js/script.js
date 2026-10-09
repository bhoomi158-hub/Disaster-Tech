// DISASTERTECH - INTERACTIVE QUIZ & SITE SCRIPTS

const answers = {
    q1: "a",
    q2: "a",
    q3: "b",
    q4: "a",
    q5: "b",
    q6: "b",
    q7: "a",
    q8: "b",
    q9: "a",
    q10: "a"
};

function checkQuiz() {
    let score = 0;
    let answeredCount = 0;
    const totalQuestions = Object.keys(answers).length;

    // Reset previous feedback styling
    document.querySelectorAll('.option-label').forEach(label => {
        label.classList.remove('is-correct', 'is-wrong');
    });

    for (let question in answers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        const correctVal = answers[question];
        const correctOptionLabel = document.querySelector(`input[name="${question}"][value="${correctVal}"]`)?.closest('.option-label');

        if (selected) {
            answeredCount++;
            const selectedLabel = selected.closest('.option-label');
            if (selected.value === correctVal) {
                score++;
                selectedLabel?.classList.add('is-correct');
            } else {
                selectedLabel?.classList.add('is-wrong');
                correctOptionLabel?.classList.add('is-correct');
            }
        } else {
            // Unanswered: highlight the correct answer
            correctOptionLabel?.classList.add('is-correct');
        }
    }

    const result = document.getElementById("quizResult");
    if (!result) return;

    const percentage = Math.round((score / totalQuestions) * 100);

    let feedbackMessage = "";
    if (score >= 8) {
        feedbackMessage = "Outstanding performance! 🎉 You have demonstrated exceptional knowledge of disaster technology, early warning systems, and life-saving safety procedures.";
    } else if (score >= 5) {
        feedbackMessage = "Good effort! 👍 You grasp the core principles, but reviewing the Technology and Safety pages will help you achieve full mastery.";
    } else {
        feedbackMessage = "Keep learning! 📚 Take some time to explore the DisasterTech guides on Case Studies and Safety Guidelines, then try again.";
    }

    result.innerHTML = `
        <div class="quiz-result-card">
            <h2>Your Score: ${score} / ${totalQuestions} (${percentage}%)</h2>
            <p>${feedbackMessage}</p>
            ${answeredCount < totalQuestions ? `<p style="color: #ffb703; font-size: 14px; margin-top: 10px;">⚠️ You answered ${answeredCount} of ${totalQuestions} questions.</p>` : ''}
            <div style="margin-top: 20px;">
                <button type="button" class="btn btn-secondary" onclick="resetQuiz()">Retake Quiz</button>
            </div>
        </div>
    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function resetQuiz() {
    const form = document.getElementById("disasterQuizForm");
    if (form) form.reset();

    document.querySelectorAll('.option-label').forEach(label => {
        label.classList.remove('is-correct', 'is-wrong');
    });

    const result = document.getElementById("quizResult");
    if (result) result.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Contact form submission handler
function handleContactSubmit(event) {
    event.preventDefault();
    const feedback = document.getElementById("contactFeedback");
    const form = document.getElementById("contactForm");

    if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = "✅ Thank you! Your inquiry has been received. Our team will get back to you shortly.";
        if (form) form.reset();
        setTimeout(() => {
            feedback.style.display = "none";
        }, 6000);
    }
}
