const searchInput = document.querySelector(
  'input[placeholder="Search projects..."]',
);
const statusSelect = document.querySelector("select");
const projectCards = document.querySelectorAll(".project-card");
function filterProjects() {
  const searchTerm = searchInput.value.toLowerCase();
  const statusFilter = statusSelect.value.toLowerCase();
  projectCards.forEach((card) => {
    const title = card.getAttribute("data-title");
    const description = card.getAttribute("data-description");
    const tech = card.getAttribute("data-tech");
    const status = card.getAttribute("data-status");
    const matchesSearch =
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      tech.includes(searchTerm);
    const matchesStatus = !statusFilter || status === statusFilter;
    card.style.display = matchesSearch && matchesStatus ? "" : "none";
  });
  const visibleCards = Array.from(projectCards).filter(
    (card) => card.style.display !== "none",
  );
  const emptyState = document.querySelector(".text-center");
  emptyState.style.display = visibleCards.length === 0 ? "block" : "none";
}
searchInput.addEventListener("input", filterProjects);
statusSelect.addEventListener("change", filterProjects);