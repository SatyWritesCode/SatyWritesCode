// jobmatch.js

document.addEventListener("DOMContentLoaded", function () {
  // Theme switch logic
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleSwitch.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }
  toggleSwitch.addEventListener("change", switchTheme, false);

  // --- Job Match Score Frontend Logic ---
  const form = document.getElementById("job-match-form");
  const textarea = document.getElementById("job-description");
  const resultSection = document.getElementById("result-section");
  const matchScore = document.getElementById("match-score");
  const matchExplanation = document.getElementById("match-explanation");
  const loadingIndicator = document.getElementById("loading-indicator");
  const tryAgainBtn = document.getElementById("try-again-btn");
  const calculateBtn = form.querySelector(".calculate-btn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Hide previous results and show loading
    resultSection.style.display = "none";
    tryAgainBtn.style.display = "none";
    loadingIndicator.style.display = "block";
    calculateBtn.disabled = true;
    textarea.disabled = true;

    // Call backend API
    try {
      const response = await fetch(
        "https://job-match-backend-hwvs.onrender.com/api/job-match",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription: textarea.value }),
        }
      );
      const data = await response.json();

      loadingIndicator.style.display = "none";
      resultSection.style.display = "block";
      tryAgainBtn.style.display = "inline-block";
      if (data.score !== undefined && data.explanation) {
        matchScore.textContent = `Match Score: ${data.score}%`;
        matchScore.style.fontSize = "2rem";
        matchScore.style.fontWeight = "bold";
        matchExplanation.textContent = data.explanation;
        matchExplanation.style.color = "";
      } else if (data.error) {
        matchScore.textContent = "Error:";
        matchScore.style.fontSize = "";
        matchScore.style.fontWeight = "";
        matchExplanation.textContent = data.error;
        matchExplanation.style.color = "red";
      } else {
        matchScore.textContent = "Unexpected response:";
        matchScore.style.fontSize = "";
        matchScore.style.fontWeight = "";
        matchExplanation.textContent = JSON.stringify(data, null, 2);
        matchExplanation.style.color = "red";
      }
    } catch (err) {
      matchScore.textContent = "Error:";
      matchScore.style.fontSize = "";
      matchScore.style.fontWeight = "";
      matchExplanation.textContent =
        err.message || "Failed to connect to backend.";
      matchExplanation.style.color = "red";
      loadingIndicator.style.display = "none";
      resultSection.style.display = "block";
      tryAgainBtn.style.display = "inline-block";
    } finally {
      calculateBtn.disabled = false;
      textarea.disabled = false;
    }
  });

  tryAgainBtn.addEventListener("click", function () {
    textarea.value = "";
    resultSection.style.display = "none";
    tryAgainBtn.style.display = "none";
    textarea.focus();
  });
});
