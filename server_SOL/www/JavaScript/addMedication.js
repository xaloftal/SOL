function addMedicationCard() {
    // Create a new medication card div
    var newMedicationCard = document.createElement("div");
    newMedicationCard.className = "medication-card";

    // HTML content for the medication card
    newMedicationCard.innerHTML = `
      <label class="form-answer-letter">Nome</label>
      <input type="text" placeholder=""/>
      <br>
      <label class="form-answer-letter">Indicações</label>
      <input type="text" placeholder="" size="30"/>
    `;

    // Append the new medication card div to the container
    document.getElementById("prescription-container").appendChild(newMedicationCard);
}
