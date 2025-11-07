const scriptUrl = document.currentScript?.src || (document.querySelector('script[data-address-widget]')?.src) || '';
const baseUrl = scriptUrl ? scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1) : '';
const STAGES_URL = `${baseUrl}stages.json`;

const KENYAN_COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
  'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
  'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
  'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang’a', 'Nairobi', 'Nakuru', 'Nandi',
  'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
  'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot',
];

const COUNTY_SUBCOUNTIES = Object.freeze({
  Baringo: ['Baringo North', 'Baringo South', 'Eldama Ravine', 'Mogotio', 'Tiaty East', 'Tiaty West'],
  Bomet: ['Bomet Central', 'Bomet East', 'Chepalungu', 'Konoin', 'Sotik'],
  Bungoma: ['Bumula', 'Kabuchai', 'Kanduyi', 'Kimilili', 'Mt Elgon', 'Sirisia', 'Tongaren', 'Webuye East', 'Webuye West'],
  Busia: ['Budalangi', 'Butula', 'Funyula', 'Matayos', 'Nambale', 'Teso North', 'Teso South'],
  'Elgeyo-Marakwet': ['Keiyo North', 'Keiyo South', 'Marakwet East', 'Marakwet West'],
  Embu: ['Manyatta', 'Mbeere North', 'Mbeere South', 'Runyenjes'],
  Garissa: ['Balambala', 'Dadaab', 'Fafi', 'Garissa Township', 'Ijara', 'Lagdera'],
  'Homa Bay': ['Homa Bay Town', 'Kabondo Kasipul', 'Karachuonyo', 'Kasipul', 'Mbita', 'Ndhiwa', 'Rangwe', 'Suba'],
  Isiolo: ['Isiolo', 'Merti', 'Garbatulla'],
  Kajiado: ['Kajiado Central', 'Kajiado East', 'Kajiado North', 'Kajiado South', 'Kajiado West'],
  Kakamega: ['Butere', 'Ikolomani', 'Khwisero', 'Lugari', 'Lurambi', 'Malava', 'Matungu', 'Mumias East', 'Mumias West', 'Navakholo'],
  Kericho: ['Belgut', 'Bureti', 'Kipkelion East', 'Kipkelion West', 'Sigowet-Soin'],
  Kiambu: ['Gatundu North', 'Gatundu South', 'Githunguri', 'Juja', 'Kabete', 'Kiambaa', 'Kiambu Town', 'Kikuyu', 'Limuru', 'Lari', 'Ruiru', 'Thika Town'],
  Kilifi: ['Ganze', 'Kaloleni', 'Kilifi North', 'Kilifi South', 'Magarini', 'Malindi', 'Rabai'],
  Kirinyaga: ['Gichugu', 'Kirinyaga Central', 'Mwea East', 'Mwea West'],
  Kisii: ['Bobasi', 'Bomachoge Borabu', 'Bomachoge Chache', 'Bonchari', 'Kitutu Chache North', 'Kitutu Chache South', 'Nyaribari Chache', 'Nyaribari Masaba', 'South Mugirango'],
  Kisumu: ['Kisumu Central', 'Kisumu East', 'Kisumu West', 'Muhoroni', 'Nyakach', 'Nyando', 'Seme'],
  Kitui: ['Kitui Central', 'Kitui East', 'Kitui Rural', 'Kitui South', 'Kitui West', 'Mwingi Central', 'Mwingi North', 'Mwingi West'],
  Kwale: ['Kinango', 'Lunga Lunga', 'Matuga', 'Msambweni'],
  Laikipia: ['Laikipia East', 'Laikipia North', 'Laikipia West'],
  Lamu: ['Lamu East', 'Lamu West'],
  Machakos: ['Kangundo', 'Kathiani', 'Machakos Town', 'Masinga', 'Matungulu', 'Mavoko', 'Mwala', 'Yatta'],
  Makueni: ['Kaiti', 'Kibwezi East', 'Kibwezi West', 'Kilome', 'Mbooni', 'Makueni'],
  Mandera: ['Banisa', 'Lafey', 'Mandera East', 'Mandera North', 'Mandera South', 'Mandera West'],
  Marsabit: ['Laisamis', 'Moyale', 'North Horr', 'Saku'],
  Meru: ['Buuri', 'Central Imenti', 'Igembe Central', 'Igembe North', 'Igembe South', 'North Imenti', 'South Imenti', 'Tigania East', 'Tigania West'],
  Migori: ['Awendo', 'Kuria East', 'Kuria West', 'Nyatike', 'Rongo', 'Suna East', 'Suna West', 'Uriri'],
  Mombasa: ['Changamwe', 'Jomvu', 'Kisauni', 'Likoni', 'Mvita', 'Nyali'],
  "Murang’a": ['Gatanga', 'Kandara', 'Kangema', 'Kiharu', 'Kigumo', 'Mathioya', 'Maragwa'],
  Nakuru: ['Bahati', 'Gilgil', 'Kuresoi North', 'Kuresoi South', 'Molo', 'Naivasha', 'Nakuru East', 'Nakuru West', 'Njoro', 'Rongai', 'Subukia'],
  Nandi: ['Aldai', 'Chesumei', 'Emgwen', 'Mosop', 'Nandi Hills', 'Tinderet'],
  Narok: ['Emurua Dikirr', 'Kilgoris', 'Narok East', 'Narok North', 'Narok South', 'Narok West'],
  Nyamira: ['Borabu', 'Manga', 'Masaba North', 'Nyamaiya', 'West Mugirango'],
  Nyandarua: ['Engineer', 'Kipipiri', 'Kinangop', 'Mirangine', 'Ndaragwa', 'Ol Jorok', 'Ol Kalou'],
  Nyeri: ['Kieni East', 'Kieni West', 'Mathira East', 'Mathira West', 'Mukurweini', 'Nyeri Central', 'Othaya', 'Tetu'],
  Samburu: ['Samburu East', 'Samburu North', 'Samburu West'],
  Siaya: ['Alego Usonga', 'Bondo', 'Gem', 'Rarieda', 'Ugenya', 'Ugunja'],
  'Taita-Taveta': ['Mwatate', 'Taveta', 'Voi', 'Wundanyi'],
  'Tana River': ['Bura', 'Galole', 'Garsen'],
  'Tharaka-Nithi': ['Chuka/Igambang’ombe', 'Maara', 'Tharaka'],
  'Trans Nzoia': ['Cherangany', 'Endebess', 'Kwanza', 'Kiminini', 'Saboti'],
  Turkana: ['Loima', 'Turkana Central', 'Turkana East', 'Turkana North', 'Turkana South', 'Turkana West'],
  'Uasin Gishu': ['Ainabkoi', 'Kapseret', 'Kesses', 'Moiben', 'Soy', 'Turbo'],
  Vihiga: ['Emuhaya', 'Hamisi', 'Luanda', 'Sabatia', 'Vihiga'],
  Wajir: ['Eldas', 'Habaswein', 'Tarbaj', 'Wajir East', 'Wajir North', 'Wajir South', 'Wajir West'],
  'West Pokot': ['Kapenguria', 'Kipkomo', 'Pokot South', 'Sigor'],
});

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: "Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
    }

    .card {
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      border-radius: 1rem;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      padding: 2rem;
      border: 1px solid rgba(148, 163, 184, 0.35);
      max-width: 520px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0;
    }

    .mode-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(37, 99, 235, 0.12);
      color: #1d4ed8;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    form {
      display: grid;
      gap: 1.25rem;
    }

    .section {
      display: grid;
      gap: 1.25rem;
    }

    .section[hidden] {
      display: none !important;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    select,
    textarea {
      padding: 0.75rem 0.9rem;
      font-size: 0.95rem;
      border-radius: 0.7rem;
      border: 1px solid rgba(148, 163, 184, 0.6);
      background: rgba(255, 255, 255, 0.95);
      transition: border-color 120ms ease, box-shadow 120ms ease;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
      outline: none;
    }

    .inline {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }

    .inline input[type="checkbox"] {
      width: 1.1rem;
      height: 1.1rem;
      accent-color: #2563eb;
    }

    button[type="submit"] {
      margin-top: 0.5rem;
      padding: 0.85rem 1.25rem;
      border-radius: 0.75rem;
      border: none;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }

    button[type="submit"]:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 32px rgba(37, 99, 235, 0.35);
    }

    button[type="submit"]:disabled {
      background: #cbd5f5;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    .helper {
      font-size: 0.8rem;
      color: #475569;
    }

    .error {
      background: rgba(248, 113, 113, 0.12);
      border: 1px solid rgba(248, 113, 113, 0.35);
      color: #991b1b;
      padding: 0.75rem 1rem;
      border-radius: 0.7rem;
      font-size: 0.85rem;
      display: none;
    }

    .error.active {
      display: block;
    }

    .success {
      margin-top: 1rem;
      background: rgba(74, 222, 128, 0.14);
      border: 1px solid rgba(34, 197, 94, 0.4);
      color: #166534;
      padding: 0.85rem 1rem;
      border-radius: 0.7rem;
      font-size: 0.95rem;
      display: none;
    }

    .success.active {
      display: block;
    }

    .suggestions {
      position: relative;
    }

    .suggestions-list {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      right: 0;
      max-height: 14rem;
      overflow-y: auto;
      background: #ffffff;
      border: 1px solid rgba(148, 163, 184, 0.4);
      border-radius: 0.75rem;
      box-shadow: 0 22px 45px rgba(15, 23, 42, 0.16);
      padding: 0.35rem;
      display: none;
      z-index: 20;
    }

    .suggestions-list.active {
      display: block;
    }

    .suggestion {
      padding: 0.55rem 0.75rem;
      border-radius: 0.65rem;
      cursor: pointer;
      transition: background 120ms ease;
    }

    .suggestion:hover,
    .suggestion.active {
      background: rgba(37, 99, 235, 0.12);
    }

    .suggestion strong {
      display: block;
      font-weight: 600;
      font-size: 0.95rem;
      color: #1e293b;
    }

    .suggestion span {
      display: block;
      font-size: 0.75rem;
      color: #475569;
    }

    @media (max-width: 600px) {
      .card {
        padding: 1.5rem;
        border-radius: 0.9rem;
      }

      h2 {
        font-size: 1.35rem;
      }
    }
  </style>
  <div class="card">
    <div class="header">
      <h2>Delivery Address</h2>
      <span class="mode-badge" id="mode-label"></span>
    </div>
    <form novalidate>
      <div class="error" id="error"></div>

      <div class="section" id="contacts-section">
        <label>
          Full name
          <input type="text" name="fullName" placeholder="Jane Doe" required autocomplete="name" />
        </label>

        <label>
          Phone number
          <input type="tel" name="phone" placeholder="0700 000 000" required autocomplete="tel" />
          <span class="helper">Include country code (+254) if outside Kenya.</span>
        </label>

        <div class="inline" id="whatsapp-toggle">
          <input type="checkbox" id="same-whatsapp" checked />
          <label for="same-whatsapp" class="inline">Same number for WhatsApp?</label>
        </div>

        <label id="whatsapp-label" hidden>
          WhatsApp number
          <input type="tel" name="whatsapp" placeholder="0700 000 000" autocomplete="tel" />
        </label>

        <label>
          Email address
          <input type="email" name="email" placeholder="jane@example.com" required autocomplete="email" />
        </label>
      </div>

      <div class="section" id="location-section">
        <label>
          County
          <select name="county" required>
            <option value="" disabled selected>Select county</option>
          </select>
        </label>

        <label>
          Subcounty
          <input type="text" name="subcounty" list="subcounty-list" placeholder="e.g. Westlands" required />
          <datalist id="subcounty-list"></datalist>
        </label>

        <label class="suggestions">
          Closest matatu/bus stage
          <input type="text" name="stage" placeholder="Start typing stage name" autocomplete="off" required />
          <div class="suggestions-list" id="suggestions"></div>
          <span class="helper">Stage suggestions are based on Nairobi PSV stages.</span>
        </label>
      </div>

      <button type="submit" id="submit-button">Save Address</button>
      <div class="success" id="success">Address captured. You can safely close this form.</div>
    </form>
  </div>
`;

class KenyaAddressWidget extends HTMLElement {
  static get observedAttributes() {
    return ['mode'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('form');
    this.errorEl = this.shadowRoot.getElementById('error');
    this.successEl = this.shadowRoot.getElementById('success');
    this.modeLabel = this.shadowRoot.getElementById('mode-label');
    this.contactsSection = this.shadowRoot.getElementById('contacts-section');
    this.locationSection = this.shadowRoot.getElementById('location-section');
    this.submitButton = this.shadowRoot.getElementById('submit-button');
    this.countySelect = this.shadowRoot.querySelector('select[name="county"]');
    this.subcountyInput = this.shadowRoot.querySelector('input[name="subcounty"]');
    this.subcountyList = this.shadowRoot.getElementById('subcounty-list');
    this.stageInput = this.shadowRoot.querySelector('input[name="stage"]');
    this.suggestionsList = this.shadowRoot.getElementById('suggestions');
    this.sameWhatsappCheckbox = this.shadowRoot.getElementById('same-whatsapp');
    this.whatsappLabel = this.shadowRoot.getElementById('whatsapp-label');
    this.whatsappToggle = this.shadowRoot.getElementById('whatsapp-toggle');

    this.stageData = [];
    this.nairobiSubcounties = [];
    this.filteredStages = [];
    this.selectedStage = null;
    this.stageSearchDebounce = null;
    this.mode = 'full';
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'mode' && this.isConnected) {
      this.mode = this.normalizeMode(newValue);
      this.applyMode();
    }
  }

  connectedCallback() {
    this.mode = this.normalizeMode(this.getAttribute('mode'));
    this.populateCounties();
    this.populateSubcounties(this.countySelect.value || '');
    this.loadStageData();
    this.addEventListeners();
    this.applyMode();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  populateCounties() {
    const frag = document.createDocumentFragment();
    KENYAN_COUNTIES.forEach((county) => {
      const option = document.createElement('option');
      option.value = county;
      option.textContent = county;
      frag.appendChild(option);
    });
    this.countySelect.appendChild(frag);
  }

  populateSubcounties(county) {
    this.subcountyList.innerHTML = '';
    const frag = document.createDocumentFragment();
    let options = [];

    if (county === 'Nairobi' && this.nairobiSubcounties.length > 0) {
      options = this.nairobiSubcounties;
    } else if (COUNTY_SUBCOUNTIES[county]) {
      options = COUNTY_SUBCOUNTIES[county];
    }

    options.forEach((sub) => {
      const option = document.createElement('option');
      option.value = sub;
      frag.appendChild(option);
    });

    this.subcountyList.appendChild(frag);
    if (county !== 'Nairobi') {
      this.stageInput.placeholder = 'Type the nearest bus stop or stage';
    } else {
      this.stageInput.placeholder = 'Start typing stage name (Nairobi only)';
    }
  }

  async loadStageData() {
    try {
      const response = await fetch(STAGES_URL, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Failed to load stages (${response.status})`);
      const payload = await response.json();
      this.stageData = payload.stages.map((stage) => ({
        ...stage,
        stageLower: stage.stage.toLowerCase(),
        subcountyLower: stage.subcounty.toLowerCase(),
      }));
      this.nairobiSubcounties = payload.subcounties || [];
      if (this.isNairobiSelected()) {
        this.populateSubcounties('Nairobi');
      }
    } catch (error) {
      console.error('[kenya-address-widget] Unable to load stages.json', error);
      this.showError('Unable to load stage suggestions. Please check your connection and refresh.');
    }
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.onSubmit);
    this.stageInput.addEventListener('input', this.onStageInput);
    this.stageInput.addEventListener('focus', this.onStageFocus);
    this.stageInput.addEventListener('blur', this.onStageBlur);
    this.countySelect.addEventListener('change', this.onCountyChange);
    this.subcountyInput.addEventListener('input', this.onSubcountyInput);
    this.sameWhatsappCheckbox?.addEventListener('change', this.onWhatsappToggle);
    this.suggestionsList.addEventListener('mousedown', this.onSuggestionClick);
  }

  removeEventListeners() {
    this.form.removeEventListener('submit', this.onSubmit);
    this.stageInput.removeEventListener('input', this.onStageInput);
    this.stageInput.removeEventListener('focus', this.onStageFocus);
    this.stageInput.removeEventListener('blur', this.onStageBlur);
    this.countySelect.removeEventListener('change', this.onCountyChange);
    this.subcountyInput.removeEventListener('input', this.onSubcountyInput);
    this.sameWhatsappCheckbox?.removeEventListener('change', this.onWhatsappToggle);
    this.suggestionsList.removeEventListener('mousedown', this.onSuggestionClick);
  }

  onCountyChange = (event) => {
    const county = event.target.value;
    this.populateSubcounties(county);
    this.selectedStage = null;
    this.filteredStages = [];
    this.hideSuggestions();
    if (!this.isNairobiSelected()) {
      this.stageInput.value = this.stageInput.value;
    }
  };

  onSubcountyInput = () => {
    this.selectedStage = null;
    this.filteredStages = [];
    this.hideSuggestions();
  };

  onWhatsappToggle = () => {
    if (!this.sameWhatsappCheckbox) return;
    const sameNumber = this.sameWhatsappCheckbox.checked;
    this.whatsappLabel.hidden = sameNumber;
    const whatsappInput = this.whatsappLabel.querySelector('input[name="whatsapp"]');
    if (sameNumber) {
      whatsappInput.value = '';
      whatsappInput.required = false;
    } else {
      whatsappInput.required = true;
      whatsappInput.focus();
    }
  };

  onStageInput = (event) => {
    const value = event.target.value.trim();
    this.selectedStage = null;

    if (this.stageSearchDebounce) {
      clearTimeout(this.stageSearchDebounce);
    }

    if (!this.isNairobiSelected() || value.length < 2) {
      this.hideSuggestions();
      return;
    }

    this.stageSearchDebounce = setTimeout(() => {
      this.filteredStages = this.getFilteredStages(value);
      this.renderSuggestions();
    }, 120);
  };

  onStageFocus = () => {
    if (!this.isNairobiSelected()) return;
    if (this.filteredStages.length > 0) {
      this.renderSuggestions(true);
    }
  };

  onStageBlur = () => {
    setTimeout(() => this.hideSuggestions(), 120);
  };

  onSuggestionClick = (event) => {
    const item = event.target.closest('[data-stage-index]');
    if (!item) return;
    const index = Number(item.dataset.stageIndex);
    const selected = this.filteredStages[index];
    if (!selected) return;

    this.selectedStage = selected;
    this.stageInput.value = selected.stage;
    if (selected.subcounty && !this.subcountyInput.value) {
      this.subcountyInput.value = selected.subcounty;
    }
    this.hideSuggestions();
  };

  getFilteredStages(query) {
    if (!this.isNairobiSelected()) {
      return [];
    }

    const term = query.toLowerCase();
    const selectedSubcounty = (this.subcountyInput.value || '').toLowerCase();
    const filterBySubcounty = selectedSubcounty.length > 0;
    const results = [];

    for (const stage of this.stageData) {
      if (filterBySubcounty && stage.subcountyLower !== selectedSubcounty) {
        continue;
      }

      let score = 0;
      if (stage.stageLower.startsWith(term)) score += 3;
      if (stage.stageLower.includes(term)) score += 2;
      if (!filterBySubcounty && stage.subcountyLower.includes(term)) score += 1;
      if (score > 0) {
        results.push({ ...stage, score });
      }
    }

    if (filterBySubcounty && results.length === 0) {
      const seen = new Set();
      for (const stage of this.stageData) {
        if (stage.stageLower.includes(term) && !seen.has(stage.stageLower)) {
          const score = stage.stageLower.startsWith(term) ? 2 : 1;
          results.push({ ...stage, score });
          seen.add(stage.stageLower);
        }
      }
    }

    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.distance_from_cbd != null && b.distance_from_cbd != null) {
        return a.distance_from_cbd - b.distance_from_cbd;
      }
      return a.stage.localeCompare(b.stage);
    });

    return results.slice(0, 12);
  }

  renderSuggestions(forceVisible = false) {
    this.suggestionsList.innerHTML = '';
    if (!this.isNairobiSelected() || this.filteredStages.length === 0) {
      this.hideSuggestions();
      return;
    }

    const frag = document.createDocumentFragment();
    this.filteredStages.forEach((stage, index) => {
      const div = document.createElement('div');
      div.className = 'suggestion';
      div.dataset.stageIndex = String(index);
      const distance = stage.distance_from_cbd != null
        ? `${stage.distance_from_cbd.toFixed(1)} km from CBD`
        : 'Distance unavailable';
      div.innerHTML = `
        <strong>${stage.stage}</strong>
        <span>${stage.subcounty} • ${distance}</span>
      `;
      frag.appendChild(div);
    });

    this.suggestionsList.appendChild(frag);
    this.suggestionsList.classList.add('active');

    if (forceVisible) {
      this.suggestionsList.scrollTop = 0;
    }
  }

  hideSuggestions() {
    this.suggestionsList.classList.remove('active');
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.clearMessages();

    if (!this.form.reportValidity()) {
      this.showError('Kindly fill in all required fields.');
      return;
    }

    const formData = new FormData(this.form);
    const phone = formData.get('phone')?.toString().trim() ?? '';
    const payload = {
      mode: this.mode,
      fullName: formData.get('fullName')?.toString().trim() || undefined,
      phone: phone || undefined,
      whatsappSameAsPhone: this.sameWhatsappCheckbox ? this.sameWhatsappCheckbox.checked : undefined,
      whatsapp: this.sameWhatsappCheckbox && !this.sameWhatsappCheckbox.checked
        ? formData.get('whatsapp')?.toString().trim() || undefined
        : phone || undefined,
      email: formData.get('email')?.toString().trim() || undefined,
      county: formData.get('county')?.toString() || '',
      subcounty: formData.get('subcounty')?.toString().trim() || '',
      stage: formData.get('stage')?.toString().trim() || '',
      geo: this.selectedStage
        ? {
            lat: this.selectedStage.lat,
            lon: this.selectedStage.lon,
            distanceFromCbdKm: this.selectedStage.distance_from_cbd ?? null,
          }
        : null,
      submittedAt: new Date().toISOString(),
    };

    if (!payload.stage) {
      this.showError('Please enter your nearest stage.');
      return;
    }

    if (this.isNairobiSelected() && !this.selectedStage) {
      const matched = this.stageData.find((stage) => stage.stageLower === payload.stage.toLowerCase());
      if (matched) {
        this.selectedStage = matched;
        payload.geo = {
          lat: matched.lat,
          lon: matched.lon,
          distanceFromCbdKm: matched.distance_from_cbd ?? null,
        };
        if (!payload.subcounty) {
          payload.subcounty = matched.subcounty;
        }
      }
    }

    if (this.isNairobiSelected() && !payload.geo) {
      this.showError('Please choose a stage from the Nairobi suggestions so we can capture the exact location.');
      return;
    }

    if (this.mode === 'stage-only') {
      payload.fullName = undefined;
      payload.phone = undefined;
      payload.whatsappSameAsPhone = undefined;
      payload.whatsapp = undefined;
      payload.email = undefined;
    }

    this.successEl.classList.add('active');

    this.dispatchEvent(new CustomEvent('address-submit', {
      bubbles: true,
      composed: true,
      detail: payload,
    }));
  };

  showError(message) {
    this.errorEl.textContent = message;
    this.errorEl.classList.add('active');
    this.successEl.classList.remove('active');
  }

  clearMessages() {
    this.errorEl.classList.remove('active');
    this.successEl.classList.remove('active');
  }

  normalizeMode(value) {
    return value === 'stage-only' ? 'stage-only' : 'full';
  }

  isNairobiSelected() {
    return (this.countySelect.value || '').toLowerCase() === 'nairobi';
  }

  applyMode() {
    const stageOnly = this.mode === 'stage-only';

    if (this.modeLabel) {
      this.modeLabel.textContent = stageOnly ? 'Stage-only mode' : 'Full checkout form';
    }

    if (this.contactsSection) {
      this.contactsSection.hidden = stageOnly;
      this.whatsappToggle.hidden = stageOnly;
    }

    if (this.submitButton) {
      this.submitButton.textContent = stageOnly ? 'Save Stage' : 'Save Address';
    }

    if (this.sameWhatsappCheckbox) {
      this.sameWhatsappCheckbox.checked = true;
      this.onWhatsappToggle();
    }

    if (stageOnly) {
      this.contactsSection.querySelectorAll('input, select').forEach((el) => {
        if (el.hasAttribute('required')) {
          el.dataset._required = 'true';
          el.removeAttribute('required');
        }
      });
    } else {
      this.contactsSection.querySelectorAll('input, select').forEach((el) => {
        if (el.dataset._required === 'true') {
          el.setAttribute('required', '');
        }
      });
    }
  }
}

if (!customElements.get('kenya-address-widget')) {
  customElements.define('kenya-address-widget', KenyaAddressWidget);
}
