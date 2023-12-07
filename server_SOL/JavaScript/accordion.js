function toggleAccordion(contentId, btnId) {
  var content = document.getElementById(contentId);
  var btn = document.getElementById(btnId);

  // Toggle the accordion content
  content.classList.toggle("show");

  // Toggle the button text
  if (content.classList.contains("show")) {
      btn.innerHTML = "Collapse Accordion";
  } else {
      btn.innerHTML = "Expand Accordion";
  }

}