document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const shortDescription = document.getElementById("shortDescription").value.trim();
    const problem = document.getElementById("problem").value.trim();
    const solution = document.getElementById("solution").value.trim();
    const techStack = document.getElementById("techStack").value.trim();
    const status = document.getElementById("status").value;
    const teamType = document.getElementById("teamType").value;
    const agreeTerms = document.getElementById("agreeTerms").checked;

    if (!title || !shortDescription || !problem || !solution || !techStack || !status || !teamType || !agreeTerms) {
        showError("Please fill in all required fields and agree to the terms.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    showSuccess("Project published successfully!");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset form after 1.5 seconds
    setTimeout(() => {
        // window.location.href = '/projects';
        this.reset();
    }, 1500);
});

function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    document.getElementById("errorText").textContent = message;
    errorDiv.classList.remove("hidden");
    document.getElementById("successMessage").classList.add("hidden");
}

function showSuccess(message) {
    const successDiv = document.getElementById("successMessage");
    document.getElementById("successText").textContent = message;
    successDiv.classList.remove("hidden");
    document.getElementById("errorMessage").classList.add("hidden");
}