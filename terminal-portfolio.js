const asciiArt = `
     _________
    / ======= \\
   / __________\\
  | ___________ |
  | | <span class="terminal-green">>ls_</span>    | |
  | |         | |
  | |_________| |________________________
  \\=____________/                        )
  / """"""""""" \\                       /
 / ::::::::::::: \\                  =D-'
(_________________) 
`;

class TerminalPortfolio extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 500px;
        font-family: "Courier New", monospace;
      }
      
      .terminal-container {
        width: 90%;
        max-width: 900px;
        height: 600px;
        min-height: 500px;
        margin: 0 auto;
        background-color: #1e2127;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .terminal-header {
        background-color: #3b3b3b;
        padding: 10px;
        display: flex;
        align-items: center;
      }

      .terminal-buttons {
        display: flex;
        margin-right: 15px;
      }

      .terminal-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .terminal-button.red {
        background-color: #FC605C;
      }
      .terminal-button.yellow {
        background-color: #FDBC40;
      }
      .terminal-button.green {
        background-color: #34C749;
      }

      .terminal-title {
        color: #00ff00;
        font-size: 14px;
        flex: 1;
        text-align: center;
      }

      .terminal-body {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
        height: calc(100% - 40px);
        color: #abb2bf;
      }

      .line {
        line-height: 1.5;
        white-space: normal;
        word-break: break-all;
      }

      .ascii-art {
        font-size: 14px;
      }

      .prompt {
        color: #00ff00;
        font-weight: bold;
      }

      .hostname {
        color: #61afef;
      }

      .directory {
        color: #e5c07b;
      }

      .input-line {
        display: flex;
        margin-bottom: 10px;
      }

      .input-prefix {
        white-space: nowrap;
        margin-right: 10px;
      }

      .input-field {
        background: transparent;
        border: none;
        color: #abb2bf;
        font-family: "Courier New", monospace;
        font-size: inherit;
        outline: none;
        flex: 1;
      }

      .output {
        margin-bottom: 20px;
        color: #abb2bf;
      }

      .output h3 {
        color: #61afef;
        margin: 8px 0;
      }

      .output p {
        margin: 5px 0;
        line-height: 1.5;
      }

      .output ul {
        margin: 5px 0;
        padding-left: 20px;
      }

      .output li {
        margin-bottom: 5px;
      }

      .skill-category {
        color: #c678dd;
        margin-top: 10px;
        font-weight: bold;
      }

      .project {
        margin-bottom: 20px;
        border-left: 2px solid #61afef;
        padding-left: 10px;
      }

      .project-title {
        color: #e5c07b;
        font-weight: bold;
      }

      .project-description {
        color: #abb2bf;
      }

      .project-tech {
        color: #98c379;
        font-style: italic;
      }

      .command {
        color: #c678dd;
        font-weight: bold;
      }

      .success {
        color: #98c379;
      }

      .error {
        color: #e06c75;
      }

      .terminal-green { color: #00ff00; }
    `;

    // Add HTML structure
    const template = document.createElement("div");
    template.innerHTML = `
      <div class="terminal-container">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button red"></div>
            <div class="terminal-button yellow"></div>
            <div class="terminal-button green"></div>
          </div>
          <div class="terminal-title">tim-kraemer@website:~</div>
        </div>
        <div class="terminal-body" id="terminal-body">
          <div class="line ascii-art">
            <pre>${asciiArt}</pre>
          </div>
          <div class="line">
            Welcome to the interactive portfolio of Tim Kraemer
          </div>
          <div class="line">
            Type <span class="command">help</span> to see available commands.
          </div>
          <div class="line">------------------------------------------</div>
          <div id="output-container"></div>
          <div class="input-line">
            <div class="input-prefix">
              <span class="prompt">tim-kraemer</span>@<span class="hostname"
              >website</span
              >:<span class="directory">~</span>$
            </div>
            <input type="text" class="input-field" id="input-field" autofocus />
          </div>
        </div>
      </div>
    `;

    // Append styles and template to shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template);

    // Get references to DOM elements
    this.outputContainer = this.shadowRoot.getElementById("output-container");
    this.inputField = this.shadowRoot.getElementById("input-field");
    this.terminalBody = this.shadowRoot.getElementById("terminal-body");

    // Initialize commands
    this.commands = {
      help: () => {
        return `
          <div class="output">
          Available commands:<br>
          <span class="command">help</span>        - Display this help message<br>
          <span class="command">clear</span>       - Clear the terminal screen<br>
          <span class="command">about</span>       - Display information about me<br>
          <span class="command">skills</span>      - List my technical skills<br>
          <span class="command">employment</span>  - List of current & previous employment<br>
          <span class="command">projects</span>    - Show my project portfolio<br>
          <span class="command">google</span>      - open a google.com page<br>
          </div>`;
      },

      about: () => {
        return `
          <div class="output">
          <h3>About Me</h3>
          <p>🎓 I am a current CSE M.S. student at the University of California, San Diego. I completed my undergraduate at the University of California, Santa Cruz in Computer Engineering, graduating Cum Laude.</p>

          <p>🖥️ I am an incoming software and technology intern at Deloitte for the summer of 2025, where I will be working with their National Federal Tax Services, Partnership Solutions Group (NFTS PSG).</p>
          
          <p>💡 I am passionate about software engineering, web development, backend development, and artificial intelligence.</p>
          </div>`;
      },

      skills: () => {
        return `
          <div class="output">
          <h3>Technical Skills</h3>

          <div class="skill-category">Programming Languages</div>
          <ul>
          <li>Python, Javascript</li>
          <li>C, C++</li>
          <li>SQL</li>
          <li>JSON, XML</li>
          <li>HTML, CSS</li>
          </ul>

          <div class="skill-category">Technologies</div>
          <ul>
          <li>AWS: EC2, Lambda, S3, ECS Fargate</li>
          <li>Rest API</li>
          <li>Git</li>
          <li>PostgreSQL, MongoDB</li>
          <li>Docker</li>
          <li>PostMan</li>
          </ul>

          <div class="skill-category">Libraries & Frameworks</div>
          <ul>
          <li>Flask, Node.js, Express</li>
          <li>React, Angular.js</li>
          <li>Pandas, Numpy</li>
          </ul>
          </div>`;
      },

      projects: () => {
        return `
          <div class="output">
          <h3>Projects</h3>

          <div class="project">
          <div class="project-title">Large Language Model Hacking: Graduate Research Project</div>
          <div class="project-description">Conducted a groundbreaking study on malicious tool-calling as a deterministic attack vector for LLMs, designing adaptive prompts with over 80% success in LLaMa and revealing black-box functionality in Gemini with 85% success in prompt injection attempts.</div>
          <div class="project-tech">Python, Ollama, HuggingFace, Google Colab</div>
          </div>

          <div class="project">
          <div class="project-title">IoT Water Consumption Meter</div>
          <div class="project-description">Led a team of 7 to develop an IoT faucet attachment with an iOS app, built a Flask-Nginx web server on AWS LightSail for 100+ device connections, and developed a Swift-based app with JWT authentication.</div>
          <div class="project-tech">NginX, Flask, AWS Lightsail, PostgreSQL, Swift, MQTT</div>
          </div>

          <div class="project">
          <div class="project-title">Backend Buddy - Developer Specific Toolkit</div>
          <div class="project-description">Developed a web-based developer toolbox with JSON formatting, Regex generation, and URL encoding, integrating GitHub Actions for testing and deployment with 96% coverage, and designed a secure, customizable UI with drag-and-drop functionality.</div>
          <div class="project-tech">Javascript, HTML, CSS, Jest, Playwright, Github Actions</div>
          </div>

          <div class="project">
          <div class="project-title">PantryAI</div>
          <div class="project-description">Developed a pantry management system with inventory tracking, recipe recommendations, and React integration, using Node.js for backend services and OpenAI API for personalized recipe suggestions.</div>
          <div class="project-tech">Node.js, Express, NginX, AWS, MongoDB, React Native</div>
          </div>
          </div>`;
      },

      google: () => {
        window.open("https://www.google.com", "_blank");
        return `
              <div class="output">
              <p>Opening Google.com in a new tab...</p>
              </div>
          `;
      },

      clear: () => {
        this.outputContainer.innerHTML = "";
        return "";
      },
    };

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const command = this.inputField.value.trim().toLowerCase();

        // Create command line element
        const commandLine = document.createElement("div");
        commandLine.className = "input-line";
        commandLine.innerHTML = `<div class="input-prefix"><span class="prompt">tim-kraemer</span>@<span class="hostname">portfolio</span>:<span class="directory">~</span>$</div> ${command}`;

        this.outputContainer.appendChild(commandLine);

        // Process command
        if (this.commands[command]) {
          const output = this.commands[command]();
          this.outputContainer.innerHTML += output;
        } else if (command !== "") {
          this.outputContainer.innerHTML += `<div class="output error">Command not found: ${command}. Type <span class="command">help</span> for available commands.</div>`;
        }

        // Clear input and scroll to bottom
        this.inputField.value = "";
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
      }
    });

    // Focus input field when clicked anywhere in the terminal
    this.terminalBody.addEventListener("click", () => {
      this.inputField.focus();
    });
  }
}

// Define the custom element
customElements.define("terminal-portfolio", TerminalPortfolio);
