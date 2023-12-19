function addMedicationCard() {
    
    var newMedicationCard = document.createElement("div");
    newMedicationCard.className = "medication-card";

    
    newMedicationCard.innerHTML = `
      <label class="form-answer-letter">Nome</label>
      <input type="text" placeholder=""/>
      <br>
      <label class="form-answer-letter">Indicações</label>
      <input type="text" placeholder="" size="30"/>
    `;

    
    document.getElementById("prescription-container").appendChild(newMedicationCard);
}
