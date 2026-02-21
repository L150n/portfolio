// Terminal Easter Egg Logic
document.addEventListener('DOMContentLoaded', () => {
    let inputSequence = '';
    const secretCode = 'lison';
    const terminal = document.getElementById('terminal-overlay');
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const closeTerminal = document.getElementById('close-terminal');

    // Make the terminal drag the input to focus when clicked anywhere in the body
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Listen for the secret code
    document.addEventListener('keydown', (e) => {
        // If terminal is already open, don't track the sequence
        if (terminal.classList.contains('active')) return;

        // Add character to sequence and keep the last X characters
        if (e.key && e.key.length === 1) {
            inputSequence += e.key.toLowerCase();
            if (inputSequence.length > secretCode.length) {
                inputSequence = inputSequence.slice(-secretCode.length);
            }

            if (inputSequence === secretCode) {
                openTerminal();
                inputSequence = ''; // Reset sequence
            }
        }
    });

    function openTerminal() {
        terminal.classList.add('active');
        setTimeout(() => {
            terminalInput.focus();
        }, 300); // Wait for transition
    }

    function closeTerminalFn() {
        terminal.classList.remove('active');
        terminalInput.blur();
    }

    closeTerminal.addEventListener('click', closeTerminalFn);

    // Terminal toggle button (the icon in the nav bar)
    const toggleBtn = document.getElementById('terminal-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (terminal.classList.contains('active')) {
                closeTerminalFn();
            } else {
                openTerminal();
            }
        });
    }

    // Handle terminal commands
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            if (command) {
                executeCommand(command);
            }
            this.value = ''; // clear input
        }
    });

    function executeCommand(cmd) {
        const outputDiv = document.querySelector('.terminal-output');
        
        // Echo the command
        const commandEcho = document.createElement('div');
        commandEcho.innerHTML = `<span class="prompt">guest@lison-portfolio:~$ </span>${cmd}`;
        outputDiv.appendChild(commandEcho);

        // Handle the command output
        const responseDiv = document.createElement('div');
        responseDiv.className = 'command-response';

        switch(cmd) {
            case 'help':
                responseDiv.innerHTML = `
                    Available commands:<br>
                    <span class="color">whoami</span>   - Display user info<br>
                    <span class="color">skills</span>   - List technical skills<br>
                    <span class="color">projects</span> - View project summary<br>
                    <span class="color">contact</span>  - Get contact details<br>
                    <span class="color">clear</span>    - Clear terminal output<br>
                    <span class="color">exit</span>     - Close terminal
                `;
                break;
            case 'whoami':
                responseDiv.innerHTML = `Lison Sabu. Software Engineer & Full Stack Web Developer.`;
                break;
            case 'skills':
                responseDiv.innerHTML = `
                    Frontend: HTML, CSS, JavaScript, VueJS<br>
                    Backend: Python (Django), C, Java<br>
                    Tools: Git, GSAP, TS Particles
                `;
                break;
            case 'projects':
                responseDiv.innerHTML = `
                    1. Zoro AI Chat Bot (Vue.js)<br>
                    2. Meal Mate (Canteen App)<br>
                    3. Electronics Warehouse Management (Django)<br>
                    4. Telegram Zip Bot (Python)<br>
                    5. Price Comparison Tool (Django)
                `;
                break;
            case 'contact':
                responseDiv.innerHTML = `
                    Email: lisonsabu@gmail.com<br>
                    Phone: +916238254869<br>
                    GitHub: github.com/L150n
                `;
                break;
            case 'clear':
                outputDiv.innerHTML = '';
                return; // Return early so we don't append a blank response
            case 'exit':
                closeTerminalFn();
                return;
            default:
                responseDiv.innerHTML = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        outputDiv.appendChild(responseDiv);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});
